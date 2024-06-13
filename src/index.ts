import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { prometheus } from '@hono/prometheus'
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

const app = new Hono();
const {printMetrics, registerMetrics} = prometheus()

//3rd party middleware
app.use('*', registerMetrics)
//default routes
app.get('/', (c) => {
  return c.text('EateryExpress API  Running🚀')
})
app.notFound((c) => {
  return c.text('Route Not Found', 404)
})
app.get('/metrics', printMetrics)


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

console.log("Server is running on port " + process.env.PORT || 3000)

serve({
  fetch: app.fetch,
  port:Number(process.env.PORT || 3000)
})
