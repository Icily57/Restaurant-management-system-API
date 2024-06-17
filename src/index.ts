import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { prometheus } from '@hono/prometheus'
import {html} from 'hono/html'
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import  assert from 'assert' 
import sendMail from './mail'
import cron from 'node-cron';




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
import { string } from 'zod'


const app = new Hono()

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
   <h1>Welcome to Restaurant-management-system-API </h1>
   <h2>Hello 🤗, my name is Mikaela Muthoni 😀</h2>
   <p>Feel free to interact with my API 😁</p>
    
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
app.route("/",userRouter)
app.route("/",restaurantRouter)
app.route("/",cityRouter)
app.route("/",stateRouter)
app.route("/",statusCatalogRouter)
app.route("/",ordersRouter)
app.route("/",ordersStatusRouter)
app.route("/",addressRouter)
app.route("/",commentsRouter)
app.route("/", driversRouter)
app.route("/", orderMenuItemRouter)
app.route("/", restaurantOwnerRouter)
app.route("/", menuItemsRouter)
app.route("/", categoryRouter)
app.route("/auth", authRouter)
 

cron.schedule('0 09 3 5-12 0', ()  => {
  sendMail(
      "weirdicily@gmail.com",
      'Upgrade your membership to VIP',
      "🙏Hello, for as low as $20 per month you can join our VIP family for exclusive services and major discounts on everything.The offer stands till " , 
      "Icily"  
  )
  console.log('Mail sent');
});

assert(process.env.PORT, "PORT is not set in the .env file")

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT )
})

console.log(`Server is running on port ${process.env.PORT} 📢`)