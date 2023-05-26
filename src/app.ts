import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import productRouter from './Product/product.routes'
import wishListRouter from './WishList/wishList.routes'

// Corrige erro de certificado. Como é uma aplicação de teste, é a maneira mais facil de resolver.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const app = express()

app.use(cors())
app.use(express.json())

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send({ message: error.message })
})

app.use('/', productRouter)
app.use('/', wishListRouter)

const port = 3000

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})

export default app
