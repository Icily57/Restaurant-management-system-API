import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { prometheus } from '@hono/prometheus'
import {html, raw} from 'hono/html'
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import  assert from 'assert' 


//table routers
import { userRouter } from './users/user.router'
import { restaurantRouter } from './restaurant/restaurant.router'
import { cityRouter } from './city/city.router'
import { stateRouter } from './states/state.router'
import { statusCatalogRouter } from './status_catalog/status_catalog.router'
import { ordersRouter } from './orders/orders.router'
import { ordersStatusRouter } from './orders_status/orders_status.router'
import { addressRouter } from './address/address.router'
import { commentsRouter } from './comments/comments.router'
import { driversRouter } from './drivers/drivers.router'
import { orderMenuItemRouter } from './order_menu_item/order_menu_item.router'
import { restaurantOwnerRouter } from './restaurant_owner/restaurant_owner.router'
import { menuItemsRouter } from './menu_items/menu_items.router'
import { categoryRouter } from './category/category.router'
import { authRouter } from './auth/auth.router'


const app = new Hono().basePath('/api')

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  })

const { printMetrics, registerMetrics } = prometheus()

//inbuilt middlewares
app.use(logger())  //logs request and response to the console
app.use(csrf()) //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()) //removes trailing slashes from the request URL
app.use('/', timeout(10000, customTimeoutException))

//3rd party middleware
app.use('*', registerMetrics)


// default route
app.get('/', (c) => {
  return c.html(
    html`
   <h1>Welcome to the social media API</h1>
    <ul>
      <li><b>message:</b> Welcome social media API, </li>
      <li><b>version:</b> 1.0.0,</li>
      <li><b>docs:</b> Please feel free to query the API 📢😂😂,</li>
      </ul>
 </p>
    `)
})

app.get('/ok', (c) => {
  return c.text('The server is running📢😏😏😏!')
})
app.get('/timeout', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000))
  return c.text("data after 5 seconds", 200)
})
app.get('/metrics', printMetrics)
app.notFound((c) => {
  return c.text('Route not found💀', 404)
})


//custom routes
app.route("/api",userRouter)
app.route("/api",restaurantRouter)
app.route("/api",cityRouter)
app.route("/api",stateRouter)
app.route("/api",statusCatalogRouter)
app.route("/api",ordersRouter)
app.route("/api",ordersStatusRouter)
app.route("/api",addressRouter)
app.route("/api",commentsRouter)
app.route("/api", driversRouter)
app.route("/api", orderMenuItemRouter)
app.route("/api", restaurantOwnerRouter)
app.route("/api", menuItemsRouter)
app.route("/api", categoryRouter)
app.route("/api/auth", authRouter)

assert(process.env.PORT, "PORT is not set in the .env file")

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT )
})

console.log(`Server is running on port ${process.env.PORT} 📢`)