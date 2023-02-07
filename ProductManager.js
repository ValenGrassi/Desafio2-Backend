const fs = require("fs")

class ProductManager {
    constructor() {
        this.products = [];
        this.path = [];
    }

    addProduct({title, description, price, thumbnail, code, stock, id}){
        const nuevoProducto = new Product({title, description, price, thumbnail, code, stock, id})
        const productos = this.products
        const propiedades = productos.map((prod) => {
            return prod.code;
        })

        productos.push(nuevoProducto)
        
        for(let i = 0; i < Product.length; i++){
            if(propiedades.includes(nuevoProducto.code)){
                throw new Error("Ya existe un producto con este código")
            } else{
                console.log("Producto añadido con éxito")
            }
        }
    }
    
    getProducts(){
        console.log(this.products)
        return this.products;
    }
    
    getProductById(id){ 
        const producto = this.products.find(prod => prod.id === id)
        if (producto != undefined){
            console.log(producto)
        } else {
            throw new Error("Not found")
        }
        return producto;
    }

    updateProduct(id, {title, description, price, thumbnail, code, stock}){
        const producto = this.products.find(prod => prod.id === id);
        if(title != undefined){
            producto.title = title;    
        }
        if(description != undefined){
            producto.description = description;
        }
        if(price != undefined){
            producto.price = price;
        }
        if(thumbnail != undefined){
            producto.thumbnail = thumbnail;
        }
        if(code != undefined){
            producto.code = code;
        }
        if(stock != undefined){
            producto.stock = stock;
        }
        console.log(producto, typeof producto)
        return producto
    }

    deleteProduct(id){
        const producto = this.products.find(prod => prod.id === id);
        this.products.splice(producto,1)
        console.log(this.products)
    }

    newPath({promise}){
        const productos = this.products
        const path = this.path;
        async function ruta() {
            const comoJson = JSON.stringify(productos)
            fs.promises.writeFile("producto.json", comoJson)
            
            const productoLeido = JSON.parse(await fs.promises.readFile("producto.json", "utf-8"))
            path.push(productoLeido)
            console.log(promise + ":")
            console.log(path)
        }
        ruta()
    }
}

class Product{
    title
    description
    price
    thumbnail
    code
    stock
    id

    constructor({title,description,price,thumbnail,code,stock, id = ""}){
        this.title = title
        if (title == undefined){
            throw new Error("el titulo es obligatorio")
        }
        this.description = description
        if (description == undefined){
            throw new Error("la descripcion es obligatoria")
        }
        this.price = price
        if (price == undefined){
            throw new Error("el precio es obligatorio")
        }
        this.thumbnail = thumbnail
        if (thumbnail == undefined){
            throw new Error("la foto es obligatoria")
        }
        this.code = code
        if (code == undefined){
            throw new Error("el codigo es obligatorio")
        }
        this.stock = stock
        if (stock == undefined){
            throw new Error("el stock es obligatorio")
        }
        this.id = id
    }
}

const productoNuevo = new ProductManager();
const id = Math.random().toString(30).substring(2);
const id2 = Math.random().toString(30).substring(2);

productoNuevo.getProducts()

productoNuevo.addProduct({title:"producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: 123, stock: 25, id: id})

productoNuevo.getProducts()

productoNuevo.newPath({promise: "promise"}) // <= Va a ser el último que devuelva ya que es una promesa asincrónica.

// productoNuevo.getProductById(id) <= ESTO SUCEDE EN CASO DE ENCONTRAR UN PRODUCTO CON ESE ID.
// productoNuevo.getProductById(id2) <= ESTO SUCEDE EN CASO DE NO ENCONTRAR UN PRODUCTO CON ESE ID.

productoNuevo.updateProduct(id, {title: "producto actualizado"})

productoNuevo.deleteProduct(id) // <= Va a devolver un array vacío ya que eliminamos nuestro único producto.

