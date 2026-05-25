import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar_url: string;
  bio: string;
  is_verified: boolean;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  image_url: string;
  category: string;
  created_at: string;
  likes: number;
  user: User;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: User;
}

export interface Service {
  id: string;
  user_id: string;
  title: string;
  description: string;
  type: string;
  price_min: number;
  price_max: number;
  location: string;
  image_url: string;
  rating: number;
  review_count: number;
  created_at: string;
  user: User;
}

export interface Activity {
  id: string;
  organizer_id: string;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  current_participants: number;
  image_url: string;
  created_at: string;
  user: User;
}

interface AppState {
  currentUser: User | null;
  posts: Post[];
  services: Service[];
  activities: Activity[];
  comments: Comment[];
  isLoggedIn: boolean;
  setCurrentUser: (user: User | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  addPost: (post: Post) => void;
  addComment: (comment: Comment) => void;
  addService: (service: Service) => void;
  addActivity: (activity: Activity) => void;
  likePost: (postId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  posts: [],
  services: [],
  activities: [],
  comments: [],
  isLoggedIn: false,
  
  setCurrentUser: (user) => set({ currentUser: user }),
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  addComment: (comment) => set((state) => ({ comments: [comment, ...state.comments] })),
  addService: (service) => set((state) => ({ services: [service, ...state.services] })),
  addActivity: (activity) => set((state) => ({ activities: [activity, ...state.activities] })),
  
  likePost: (postId) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    )
  })),
}));

export const mockUsers: User[] = [
  { id: '1', email: 'user1@example.com', nickname: '铲屎官小王', avatar_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cartoon%20pet%20owner%20avatar%20friendly%20smile&image_size=square', bio: '家有金毛一枚，爱狗人士', is_verified: true },
  { id: '2', email: 'user2@example.com', nickname: '猫咪控', avatar_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cartoon%20cat%20lover%20avatar%20glasses&image_size=square', bio: '三只猫的妈妈', is_verified: true },
  { id: '3', email: 'user3@example.com', nickname: '宠物达人', avatar_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cartoon%20pet%20expert%20avatar%20professional&image_size=square', bio: '专业宠物护理师', is_verified: true },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user_id: '1',
    title: '我家金毛学会了新技能！',
    content: '今天训练小金毛握手和趴下，没想到它学得这么快！才教了几遍就会了，太聪明了！附上训练视频~',
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=golden%20retriever%20dog%20performing%20trick%20happy&image_size=landscape_16_9',
    category: '训练',
    created_at: '2024-01-15T10:30:00Z',
    likes: 128,
    user: mockUsers[0],
  },
  {
    id: '2',
    user_id: '2',
    title: '猫咪挑食怎么办？',
    content: '我家主子最近特别挑食，只吃冻干不吃猫粮，体重都下降了，有没有小伙伴有好办法？',
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20refusing%20food%20funny&image_size=landscape_16_9',
    category: '求助',
    created_at: '2024-01-15T09:15:00Z',
    likes: 89,
    user: mockUsers[1],
  },
  {
    id: '3',
    user_id: '3',
    title: '分享一下我的宠物护理心得',
    content: '从事宠物护理工作多年，总结了一些经验：定期梳毛、合理饮食、适当运动，这些都很重要。',
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20pet%20grooming%20care%20clean&image_size=landscape_16_9',
    category: '分享',
    created_at: '2024-01-14T16:45:00Z',
    likes: 234,
    user: mockUsers[2],
  },
  {
    id: '4',
    user_id: '1',
    title: '周末带狗狗去公园玩耍',
    content: '天气真好，带狗狗去郊外公园玩了一整天，它开心得不得了！',
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=golden%20retriever%20playing%20in%20park%20sunny&image_size=landscape_16_9',
    category: '日常',
    created_at: '2024-01-14T14:20:00Z',
    likes: 167,
    user: mockUsers[0],
  },
  {
    id: '5',
    user_id: '2',
    title: '三只猫咪的日常',
    content: '三只猫在一起总是打打闹闹，但是睡觉的时候又特别和谐，太可爱了！',
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=three%20cute%20cats%20sleeping%20together&image_size=landscape_16_9',
    category: '日常',
    created_at: '2024-01-13T18:30:00Z',
    likes: 312,
    user: mockUsers[1],
  },
];

export const mockServices: Service[] = [
  {
    id: '1',
    user_id: '3',
    title: '专业遛狗服务',
    description: '每天早晚各一次，每次30分钟，帮您的爱犬锻炼身体，保证安全可靠！',
    type: '遛狗',
    price_min: 20,
    price_max: 50,
    location: '朝阳区',
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=dog%20walking%20service%20professional&image_size=landscape_4_3',
    rating: 4.9,
    review_count: 128,
    created_at: '2024-01-10T08:00:00Z',
    user: mockUsers[2],
  },
  {
    id: '2',
    user_id: '1',
    title: '上门喂养服务',
    description: '出差旅游不用担心宠物挨饿！上门喂食、换水、清理猫砂盆，让您放心出行。',
    type: '喂养',
    price_min: 30,
    price_max: 60,
    location: '东城区',
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=pet%20feeding%20service%20home%20visit&image_size=landscape_4_3',
    rating: 4.8,
    review_count: 89,
    created_at: '2024-01-08T10:30:00Z',
    user: mockUsers[0],
  },
  {
    id: '3',
    user_id: '3',
    title: '宠物美容护理',
    description: '专业宠物美容师，提供洗澡、剪毛、指甲修剪等服务，让您的宠物焕然一新！',
    type: '美容',
    price_min: 80,
    price_max: 150,
    location: '海淀区',
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20pet%20grooming%20salon&image_size=landscape_4_3',
    rating: 4.9,
    review_count: 203,
    created_at: '2024-01-05T09:00:00Z',
    user: mockUsers[2],
  },
  {
    id: '4',
    user_id: '2',
    title: '猫咪寄养服务',
    description: '家庭式猫咪寄养，让您的猫咪在温馨的环境中度过假期，提供每日照片反馈。',
    type: '寄养',
    price_min: 50,
    price_max: 80,
    location: '西城区',
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cat%20boarding%20service%20cozy%20home&image_size=landscape_4_3',
    rating: 4.7,
    review_count: 67,
    created_at: '2024-01-03T11:00:00Z',
    user: mockUsers[1],
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    organizer_id: '1',
    title: '宠物运动会',
    description: '周末宠物趣味运动会，设有跑步比赛、障碍赛、才艺展示等项目，快来报名参加！',
    location: '朝阳公园',
    start_time: '2024-01-20T09:00:00Z',
    end_time: '2024-01-20T12:00:00Z',
    max_participants: 50,
    current_participants: 38,
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=pet%20sports%20event%20dogs%20competition&image_size=landscape_16_9',
    created_at: '2024-01-10T08:00:00Z',
    user: mockUsers[0],
  },
  {
    id: '2',
    organizer_id: '2',
    title: '猫咪下午茶聚会',
    description: '猫奴们的聚会！带上您的猫咪一起来交流养猫心得，现场还有专业兽医解答疑问。',
    location: '猫咖咖啡馆',
    start_time: '2024-01-21T14:00:00Z',
    end_time: '2024-01-21T17:00:00Z',
    max_participants: 30,
    current_participants: 22,
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cat%20cafe%20gathering%20cute%20cats&image_size=landscape_16_9',
    created_at: '2024-01-11T10:00:00Z',
    user: mockUsers[1],
  },
  {
    id: '3',
    organizer_id: '3',
    title: '宠物训练公开课',
    description: '专业训犬师现场教学，教您如何正确训练宠物，解决常见行为问题。',
    location: '宠物训练中心',
    start_time: '2024-01-22T10:00:00Z',
    end_time: '2024-01-22T12:00:00Z',
    max_participants: 40,
    current_participants: 15,
    image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20dog%20training%20class&image_size=landscape_16_9',
    created_at: '2024-01-12T09:30:00Z',
    user: mockUsers[2],
  },
];

export const mockComments: Comment[] = [
  { id: '1', post_id: '1', user_id: '2', content: '太厉害了！我家猫咪怎么教都不会', created_at: '2024-01-15T11:00:00Z', user: mockUsers[1] },
  { id: '2', post_id: '1', user_id: '3', content: '金毛确实很聪明，恭喜！', created_at: '2024-01-15T11:30:00Z', user: mockUsers[2] },
  { id: '3', post_id: '2', user_id: '1', content: '试试饿几顿，饿了自然会吃', created_at: '2024-01-15T09:45:00Z', user: mockUsers[0] },
  { id: '4', post_id: '2', user_id: '3', content: '可以试试换一种口味的猫粮', created_at: '2024-01-15T10:00:00Z', user: mockUsers[2] },
];
