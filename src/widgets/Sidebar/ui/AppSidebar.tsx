import {
  Bookmark,
  Home,
  LogOut,
  MessageCircleMore,
  Search,
  SquarePlus,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

import { useLogoutMutation } from '@/features/auth/api/authApi'
import { useAuthMeData } from '@/features/auth/api/lib/useAuthMeData'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setCreatePostModal } from '@/shared/model/appSlice'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/widgets/Sidebar/ui/Sidebar'

export function AppSidebar() {
  const [logout, { isLoading }] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const user = useAuthMeData()

  const handleLogOut = async () => {
    try {
      await logout().unwrap()
    } catch (err) {
      console.log('Logout failed', err)
    }
  }

  const mainItems = [
    {
      title: 'Feed',
      url: '#',
      icon: Home,
    },
    {
      title: 'Create',
      url: '#',
      icon: SquarePlus,
    },
    {
      title: 'My Profile',
      url: `/profile/${user?.id}`,
      icon: Home,
    },
    {
      title: 'Messenger',
      url: '#',
      icon: MessageCircleMore,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
  ]

  const secondaryItems = [
    {
      title: 'Statistics',
      url: '#',
      icon: TrendingUp,
    },
    {
      title: 'Favorites',
      url: '#',
      icon: Bookmark,
    },
  ]

  const sidebarFooter = [
    {
      title: 'Log Out',
      url: '#',
      icon: LogOut,
    },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === 'Create' ? (
                      <button
                        onClick={
                          item.title === 'Create'
                            ? dispatch.bind(null, setCreatePostModal(true))
                            : undefined
                        }
                        className="cursor-pointer"
                      >
                        <item.icon style={{ width: '24px', height: '24px' }} />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link href={item.url}>
                        <item.icon style={{ width: '24px', height: '24px' }} />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon style={{ width: '24px', height: '24px' }} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {sidebarFooter.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <button
                  className="cursor-pointer"
                  disabled={isLoading}
                  onClick={handleLogOut}
                >
                  <item.icon style={{ width: '24px', height: '24px' }} />
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
