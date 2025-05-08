import streamlit as st
from azure.storage.blob import BlobServiceClient
import os
import pymssql
import uuid
import json
from dotenv import load_dotenv
# Load environment variables from a .env file
load_dotenv()

blobConnectionString = os.getenv("BLOB_CONNECTION_STRING")
blobContainerName = os.getenv("BLOB_CONTAINER_NAME")
blobAccountName = os.getenv("BLOB_ACCOUNT_NAME")

SQL_SERVER = os.getenv("SQL_SERVER")
SQL_DATABASE = os.getenv("SQL_DATABASE")
SQL_USERNAME = os.getenv("SQL_USERNAME")
SQL_PASSWORD = os.getenv("SQL_PASSWORD")

#form to add a product
st.title("Cadastro de Produtos")
product_name = st.text_input("Nome do Produto")
product_price = st.number_input("Preço do Produto", min_value=0.0, format="%.2f")
product_description = st.text_area("Descrição do Produto")
product_image = st.file_uploader("Imagem do Produto", type=["jpg", "jpeg", "png"])

# save the product image to blob storage
if product_image is not None:
    # Generate a unique name for the image
    image_name = str(uuid.uuid4()) + "_" + product_image.name

    # Create a BlobServiceClient
    blob_service_client = BlobServiceClient.from_connection_string(blobConnectionString)

    # Get a reference to the container
    container_client = blob_service_client.get_container_client(blobContainerName)

    # Upload the image to the container
    blob_client = container_client.get_blob_client(image_name)
    blob_client.upload_blob(product_image, overwrite=True)

    # Get the URL of the uploaded image
    image_url = f"https://{blobAccountName}.blob.core.windows.net/{blobContainerName}/{image_name}"

# Display the product details
st.subheader("Detalhes do Produto")
st.write(f"**Nome:** {product_name}")
st.write(f"**Preço:** {product_price}")
st.write(f"**Descrição:** {product_description}")
st.write(f"**Imagem:** {image_url}")

# Save the product to the database when the button is clicked
if st.button("Salvar Produto"):
    try:
        # Conexão com o banco de dados
        conn = pymssql.connect(
            server=SQL_SERVER,
            database=SQL_DATABASE,
            user=SQL_USERNAME,
            password=SQL_PASSWORD
        )
        cursor = conn.cursor()

        # Inserir o produto no banco de dados
        cursor.execute(
            "INSERT INTO Produtos (nome, descricao, preco, imagem_url) VALUES (%s, %s, %s, %s)",
            (product_name, product_price, product_description, image_url)
        )
        conn.commit()
        st.success("Produto cadastrado com sucesso!")

    except Exception as e:
        st.error(f"Erro ao cadastrar produto: {e}")
    finally:
        cursor.close()
        conn.close()

if st.button("Cadastrar Produto"):
    return_message = "Produto salvo com sucesso"

st.header("Produtos Cadastrados")

if st.button("Listar Produtos"):
    try:
        # Conexão com o banco de dados
        conn = pymssql.connect(
            server=SQL_SERVER,
            database=SQL_DATABASE,
            user=SQL_USERNAME,
            password=SQL_PASSWORD
        )
        cursor = conn.cursor()

        # Consulta SQL para obter os produtos
        cursor.execute("SELECT * FROM produtos")
        produtos = cursor.fetchall()

        if not produtos:
            st.info("A lista de produtos está vazia.")
        else:
            # Exibir os produtos
            for produto in produtos:
                st.write(f"ID: {produto[0]}")
                st.write(f"Nome: {produto[1]}")
                st.write(f"Preço: {produto[2]}")
                st.write(f"Descrição: {produto[3]}")
                st.image(produto[4])
                st.write("---")

    except Exception as e:
        st.error(f"Erro ao listar produtos: {e}")
    finally:
        cursor.close()
        conn.close()	
