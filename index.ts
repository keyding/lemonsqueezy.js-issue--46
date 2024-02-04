import { lemonSqueezySetup, createWebhook, listVariants, createCheckout } from '@lemonsqueezy/lemonsqueezy.js'

lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })

// Create a webhook
const STORE_ID = import.meta.env.LEMON_SQUEEZY_STORE_ID

const webhookRes = await createWebhook(STORE_ID, {
	url: "https://google.com/webhooks",
  events: ["order_created"],
  secret: "GOOGLE_WEBHOOKS_SECRET",
})
console.log("A webhooks is created: ", webhookRes.statusCode === 201)

// Get a variant id
const variantId = (await listVariants()).data!.data[0].id;

// Create a checkout
const { data, statusCode } = await createCheckout(STORE_ID, variantId, {
  checkoutData: {
    custom: {
      hello: 'lemonsqueezy.js'
    }
  }
})

console.log("A checkout is created: ", statusCode === 201)
console.log(data?.data.attributes.url)

