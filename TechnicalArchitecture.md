## 1. Architecture Design
```mermaid
flowchart TB
    subgraph Frontend
        A[React Components]
        B[React Router]
        C[Zustand State]
        D[Tailwind CSS]
    end
    subgraph Backend
        E[Supabase Auth]
        F[Supabase Database]
        G[Supabase Storage]
    end
    A --> E
    A --> F
    A --> G
```

## 2. Technology Description
- Frontend: React@18 + TypeScript + TailwindCSS@3 + Vite
- Initialization Tool: vite-init
- Backend: Supabase (Authentication, Database, Storage)
- State Management: Zustand
- Icons: Lucide React

## 3. Route Definitions
| Route | Purpose | Component |
|-------|---------|-----------|
| / | 首页 | HomePage |
| /community | 社区列表 | CommunityPage |
| /community/:id | 帖子详情 | PostDetailPage |
| /help | 互助服务 | HelpPage |
| /help/:id | 服务详情 | HelpDetailPage |
| /activities | 活动列表 | ActivitiesPage |
| /activities/:id | 活动详情 | ActivityDetailPage |
| /profile | 个人中心 | ProfilePage |
| /login | 登录页 | LoginPage |
| /register | 注册页 | RegisterPage |

## 4. API Definitions
通过 Supabase Client SDK 直接访问数据库，无需额外后端API。

## 5. Server Architecture Diagram
```mermaid
flowchart LR
    A[React Client] -->|REST API| B[Supabase]
    B --> C[(PostgreSQL)]
    B --> D[(Storage)]
```

## 6. Data Model

### 6.1 Data Model Definition
```mermaid
erDiagram
    USERS ||--o{ POSTS : creates
    USERS ||--o{ SERVICES : provides
    USERS ||--o{ ACTIVITIES : participates
    USERS ||--o{ PETS : owns
    POSTS ||--o{ COMMENTS : has
    SERVICES ||--o{ SERVICE_REQUESTS : receives
    ACTIVITIES ||--o{ ACTIVITY_SIGNUPS : has

    USERS {
        uuid id PK
        text email
        text phone
        text nickname
        text avatar_url
        text bio
        timestamp created_at
        boolean is_verified
    }

    PETS {
        uuid id PK
        uuid user_id FK
        text name
        text type
        text breed
        date birthdate
        text avatar_url
    }

    POSTS {
        uuid id PK
        uuid user_id FK
        text title
        text content
        text image_url
        text category
        timestamp created_at
        int likes
    }

    COMMENTS {
        uuid id PK
        uuid post_id FK
        uuid user_id FK
        text content
        timestamp created_at
    }

    SERVICES {
        uuid id PK
        uuid user_id FK
        text title
        text description
        text type
        float price_min
        float price_max
        text location
        text image_url
        float rating
        int review_count
        timestamp created_at
    }

    SERVICE_REQUESTS {
        uuid id PK
        uuid service_id FK
        uuid requester_id FK
        date request_date
        text status
        timestamp created_at
    }

    ACTIVITIES {
        uuid id PK
        uuid organizer_id FK
        text title
        text description
        text location
        timestamp start_time
        timestamp end_time
        int max_participants
        int current_participants
        text image_url
        timestamp created_at
    }

    ACTIVITY_SIGNUPS {
        uuid id PK
        uuid activity_id FK
        uuid user_id FK
        text status
        timestamp created_at
    }
```