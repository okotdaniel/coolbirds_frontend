// pages/api/paddle/webhook.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' })
    }
  
    // Verify webhook signature
    const signature = req.headers['paddle-signature']
    const webhookData = req.body
    
    // Forward to Django backend for processing
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/subscription/webhook/`, webhookData, {
        headers: {
          'Paddle-Signature': signature,
          'Content-Type': 'application/json'
        }
      })
      res.status(200).json(response.data)
    } catch (error) {
      console.error('Webhook processing error:', error)
      res.status(500).json({ error: 'Error processing webhook' })
    }
  }