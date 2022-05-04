class ContenedorMongo {
   constructor(model) {
      this.model = model
   }

   async readAll() {
      try {
         const data = await this.model.find({})
         //console.log(data)
         return data
      } catch (error) {
         console.log(error)
      }
   }
   async findByID(id) {
      try {
         const data = await this.model.findOne({_id: id})

         if (!data) {
            //console.log("Dif de Data")
            return "Ocurrio un error..."
         }
         //console.log(data)
         return data
      } catch (error) {
         console.log(error)
         return false
      }
   }

   async newProduct(data) {
      try {
         console.log(data, "Data Contenedor")
         const {nombre, precio, foto, descripcion, codigo, stock} = data

         const prodSaveModel = new this.model(data)
         const saved = await prodSaveModel.save()
         return saved
      } catch (error) {
         console.log(error)
      }
   }

   async deleteByID(id) {
      try {
         const existe = await this.model.findOne({_id: id})
         if (!existe) {
            return false
         }
         console.log(existe)
         await this.model.deleteOne({_id: id})

         return "El registro fue borrado con éxito."
      } catch (error) {
         console.log(error)
      }
   }

   ////EDIT
   async editByID(id, productoData) {
      const {nombre, precio, foto, descripcion, codigo, stock} = productoData
      //console.log(productoData)
      let productoActual = await this.model.findById(id)
      if (!productoActual) {
         return false
      }
      productoActual = await this.model.findByIdAndUpdate(id, productoData, {
         new: true,
         runValidators: true,
         useUnified: true,
      })
      return productoActual
   }
   ////
   async getUserByEmail(email) {
      return await this.model.findOne({email})
   }
}

export default ContenedorMongo
