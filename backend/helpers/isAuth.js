///----///---- Middleware para autenticar el acceso a rutas
const isAuthenticated = (req, res, next) => {
   try {
      if (req.isAuthenticated()) {
         next()
      } else {
         console.log("No tienes las credenciales de acceso...")
         res.status(400).json({errorMessage: "No tienes las credenciales de acceso..."})
      }
   } catch (error) {
      console.log(error)
   }
}
export default isAuthenticated
