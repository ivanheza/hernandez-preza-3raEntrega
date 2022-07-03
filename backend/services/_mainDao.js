class DAO {
   async readData() {
      throw new CustomError(500, "Falta implementar 'readData ")
   }

   async readID() {
      throw new CustomError(500, "Falta implementar 'readID' ")
   }

   async guardarNuevo() {
      throw new CustomError(500, "Falta implementar 'guardarNuevo ")
   }

   async actualizar() {
      throw new CustomError(500, "Falta implementar 'actualizar ")
   }

   async borrar() {
      throw new CustomError(500, "Falta implementar 'borrar ")
   }
}

export default DAO
