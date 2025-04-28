import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

// Define types for AI-related data
export interface AIPrediction {
  date: string
  predictedProduction: number
  predictedFeed: number
  confidence: number
}

export interface AIInsight {
  id: string
  type: "production" | "health" | "feed" | "environment"
  title: string
  description: string
  severity: "info" | "warning" | "critical"
  timestamp: string
  isRead: boolean
}

export interface AIRecommendation {
  id: string
  area: "production" | "health" | "feed" | "environment" | "inventory"
  title: string
  description: string
  potentialImpact: string
  timestamp: string
  isImplemented: boolean
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

interface AIState {
  predictions: AIPrediction[]
  insights: AIInsight[]
  recommendations: AIRecommendation[]
  chatHistory: ChatMessage[]
  isGeneratingPrediction: boolean
  isGeneratingInsight: boolean
  isGeneratingRecommendation: boolean
  isChatLoading: boolean
  error: string | null
}

// Sample data
const sampleInsights: AIInsight[] = [
  {
    id: "INS0001",
    type: "production",
    title: "Production Anomaly Detected",
    description:
      "Egg production in House 2 has decreased by 5% over the last 3 days, which is outside the normal variation range.",
    severity: "warning",
    timestamp: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "INS0002",
    type: "environment",
    title: "Temperature Fluctuation",
    description:
      "House 1 is experiencing temperature fluctuations of more than 3°C within 2-hour periods, which may stress the birds.",
    severity: "critical",
    timestamp: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "INS0003",
    type: "feed",
    title: "Feed Efficiency Improvement",
    description: "Feed conversion ratio has improved by 3% in House 3 following the recent feed formula adjustment.",
    severity: "info",
    timestamp: new Date().toISOString(),
    isRead: false,
  },
]

const sampleRecommendations: AIRecommendation[] = [
  {
    id: "REC0001",
    area: "environment",
    title: "Optimize Ventilation Schedule",
    description:
      "Adjust ventilation cycles in House 1 to run 10 minutes longer during peak temperature hours (12-3pm).",
    potentialImpact: "Could reduce heat stress and potentially increase production by 1-2%.",
    timestamp: new Date().toISOString(),
    isImplemented: false,
  },
  {
    id: "REC0002",
    area: "feed",
    title: "Adjust Feed Formula",
    description: "Increase protein content by 0.5% in the layer feed to support peak production period.",
    potentialImpact: "May improve egg size consistency and shell quality.",
    timestamp: new Date().toISOString(),
    isImplemented: false,
  },
  {
    id: "REC0003",
    area: "inventory",
    title: "Optimize Vaccine Ordering",
    description: "Order Newcastle Disease vaccines 2 weeks earlier to avoid potential supply chain delays.",
    potentialImpact: "Ensures vaccination schedule adherence and prevents health risks.",
    timestamp: new Date().toISOString(),
    isImplemented: false,
  },
]

const initialState: AIState = {
  predictions: [],
  insights: sampleInsights,
  recommendations: sampleRecommendations,
  chatHistory: [],
  isGeneratingPrediction: false,
  isGeneratingInsight: false,
  isGeneratingRecommendation: false,
  isChatLoading: false,
  error: null,
}

// Simplified async thunks that just return dummy data
export const generateProductionPrediction = createAsyncThunk(
  "ai/generateProductionPrediction",
  async (days: number) => {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const predictions: AIPrediction[] = []
    const today = new Date()

    for (let i = 1; i <= days; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)

      // Generate some realistic-looking predictions
      const baseProduction = 8500 + Math.random() * 1000
      const baseFeed = 500 + Math.random() * 50
      const dayOfWeek = date.getDay()

      // Add some weekly patterns
      const dayFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.95 : 1.02

      predictions.push({
        date: date.toISOString().split("T")[0],
        predictedProduction: Math.round(baseProduction * dayFactor),
        predictedFeed: Math.round(baseFeed * dayFactor),
        confidence: 0.85 + Math.random() * 0.1,
      })
    }

    return predictions
  },
)

export const generateAIInsights = createAsyncThunk("ai/generateAIInsights", async () => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return new random insights
  return [
    {
      id: `INS${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      type: "production" as const,
      title: "New Production Pattern Detected",
      description: "Egg production shows a consistent 3% increase on Tuesdays and Wednesdays across all houses.",
      severity: "info" as const,
      timestamp: new Date().toISOString(),
      isRead: false,
    },
    {
      id: `INS${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      type: "health" as const,
      title: "Potential Early Health Issue",
      description: "Slight increase in water consumption in House 3 may indicate early respiratory issues.",
      severity: "warning" as const,
      timestamp: new Date().toISOString(),
      isRead: false,
    },
  ]
})

export const generateAIRecommendations = createAsyncThunk("ai/generateAIRecommendations", async () => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return new random recommendations
  return [
    {
      id: `REC${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      area: "production" as const,
      title: "Adjust Lighting Schedule",
      description: "Extend morning light period by 15 minutes to stimulate increased egg production.",
      potentialImpact: "May increase daily egg production by 1-2% based on historical data.",
      timestamp: new Date().toISOString(),
      isImplemented: false,
    },
    {
      id: `REC${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      area: "health" as const,
      title: "Increase Vitamin Supplementation",
      description: "Add vitamin D supplement to water for House 2 birds to improve shell quality.",
      potentialImpact: "Could reduce cracked eggs by up to 0.5% and improve overall shell strength.",
      timestamp: new Date().toISOString(),
      isImplemented: false,
    },
  ]
})

export const sendChatMessage = createAsyncThunk("ai/sendChatMessage", async (message: string) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Generate a user message
  const userMessage: ChatMessage = {
    id: `MSG${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
    role: "user",
    content: message,
    timestamp: new Date().toISOString(),
  }

  // Generate an AI response based on the message
  let response = ""

  if (message.toLowerCase().includes("production")) {
    response =
      "Based on current data, egg production is trending 3% above target for this month. House 2 is performing particularly well with a 5% increase in the last week."
  } else if (message.toLowerCase().includes("health") || message.toLowerCase().includes("disease")) {
    response =
      "All flocks are currently healthy with no significant disease indicators. The last vaccination was completed on March 15th with 100% coverage."
  } else if (message.toLowerCase().includes("feed") || message.toLowerCase().includes("consumption")) {
    response =
      "Feed consumption is within normal parameters. The current feed conversion ratio is 1.85, which is slightly better than the industry average of 1.9."
  } else if (message.toLowerCase().includes("temperature") || message.toLowerCase().includes("environment")) {
    response =
      "Environmental conditions are optimal in all houses except House 1, which is showing temperature fluctuations during mid-day. I recommend checking the ventilation system."
  } else {
    response =
      "I can help you analyze production data, monitor flock health, track feed consumption, and monitor environmental conditions. What specific information are you looking for?"
  }

  const assistantMessage: ChatMessage = {
    id: `MSG${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
    role: "assistant",
    content: response,
    timestamp: new Date().toISOString(),
  }

  return [userMessage, assistantMessage]
})

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    markInsightAsRead: (state, action: PayloadAction<string>) => {
      const insight = state.insights.find((i) => i.id === action.payload)
      if (insight) {
        insight.isRead = true
      }
    },
    markRecommendationAsImplemented: (state, action: PayloadAction<string>) => {
      const recommendation = state.recommendations.find((r) => r.id === action.payload)
      if (recommendation) {
        recommendation.isImplemented = true
      }
    },
    clearChatHistory: (state) => {
      state.chatHistory = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Production prediction
      .addCase(generateProductionPrediction.pending, (state) => {
        state.isGeneratingPrediction = true
        state.error = null
      })
      .addCase(generateProductionPrediction.fulfilled, (state, action) => {
        state.isGeneratingPrediction = false
        state.predictions = action.payload
      })
      .addCase(generateProductionPrediction.rejected, (state, action) => {
        state.isGeneratingPrediction = false
        state.error = action.error.message || "Failed to generate predictions"
      })

      // AI Insights
      .addCase(generateAIInsights.pending, (state) => {
        state.isGeneratingInsight = true
        state.error = null
      })
      .addCase(generateAIInsights.fulfilled, (state, action) => {
        state.isGeneratingInsight = false
        state.insights = [...action.payload, ...state.insights]
      })
      .addCase(generateAIInsights.rejected, (state, action) => {
        state.isGeneratingInsight = false
        state.error = action.error.message || "Failed to generate insights"
      })

      // AI Recommendations
      .addCase(generateAIRecommendations.pending, (state) => {
        state.isGeneratingRecommendation = true
        state.error = null
      })
      .addCase(generateAIRecommendations.fulfilled, (state, action) => {
        state.isGeneratingRecommendation = false
        state.recommendations = [...action.payload, ...state.recommendations]
      })
      .addCase(generateAIRecommendations.rejected, (state, action) => {
        state.isGeneratingRecommendation = false
        state.error = action.error.message || "Failed to generate recommendations"
      })

      // Chat
      .addCase(sendChatMessage.pending, (state) => {
        state.isChatLoading = true
        state.error = null
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isChatLoading = false
        state.chatHistory = [...state.chatHistory, ...action.payload]
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isChatLoading = false
        state.error = action.error.message || "Failed to send message"
      })
  },
})

export const { clearError, markInsightAsRead, markRecommendationAsImplemented, clearChatHistory } = aiSlice.actions

export default aiSlice.reducer

