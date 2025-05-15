
# Rolsa Energy

About
Full-stack Next.js application featuring MongoDB integration, authentication, dashboard, and energy calculators. Rapid development project completed in 25 hours.






## Installation

1. Clone the repsitory:
   
        git clone https://github.com/Charlie-Hunger/Rolsa-Energy

2. Install dependencies:
    
        npm install

3. Set up environment variables:
    
        DATABASE_URL=your_mongodb_connection_string
    
        JWT_SECRET=your_jwt_secret

4. Run the development server:
        
        npm run dev
 
## Features

- **Renewable Energy Solutions**
    - Solar Panel installations
    - EV Charging Points
    - Smart Energy Management Meters
- **Interactive Tools**
    - Carbon Footprint Calculator
    - Energy Usage Estimator
    - Cost Savings Projections
- **Customer Portal**
    - User account management
    - Appointment booking system
    - Service history tracking
- **Educational Content**
    - Detailed information about carbon reduction
    - Environmental impact resources
    - Energy efficiency guides

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: Iron Session
- **UI Components**: Custom components with shadcn/ui
- **Styling**: Tailwind CSS with next-themes for dark mode support

## Project Structure

        ├── public/            # Static assets
        ├── src/
        │   ├── app/           # Next.js App Router
        │   │   ├── auth/      # Authentication pages
        │   │   └── ...        # Other app routes
        │   └── lib/
        │       ├── models/    # Database models
        │       │   ├── User.ts
        │       │   └── Booking.ts
        │       └── dbConnect.ts  # Database connection utility
## Contributing

Contributions are always welcome!



