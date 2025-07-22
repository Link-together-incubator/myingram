'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { GeneralInformation } from '@/entities/profile/ui/settings/GeneralInformation/GeneralInformation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs/Tabs'

import s from './Settings.module.scss'

// Соответствие между значениями URL и табами
const tabConfig = {
  info: {
    value: 'generalInformation',
    label: 'General Information',
  },
  devices: {
    value: 'devices',
    label: 'Devices',
  },
  subscriptions: {
    value: 'accountManagement',
    label: 'Account Management',
  },
  payments: {
    value: 'myPayments',
    label: 'My Payments',
  },
} as const

type UrlTab = keyof typeof tabConfig
type TabValue = (typeof tabConfig)[UrlTab]['value']

export const Settings = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabValue>('generalInformation')

  // Находим текущий URL-параметр и синхронизируем с состоянием
  useEffect(() => {
    const urlTab = searchParams.get('part') as UrlTab | null
    if (urlTab && tabConfig[urlTab]) {
      setActiveTab(tabConfig[urlTab].value)
    } else {
      // Если параметр невалиден, устанавливаем дефолтный
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('part', 'info')
      router.replace(`${pathname}?${newSearchParams.toString()}`)
    }
  }, [pathname, router, searchParams])

  // Обработчик изменения таба
  const handleTabChange = (urlTab: UrlTab) => {
    const tabValue = tabConfig[urlTab].value
    setActiveTab(tabValue)
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('part', urlTab)
    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  // Находим активный URL-таб по текущему значению
  const activeUrlTab =
    (Object.keys(tabConfig) as UrlTab[]).find(
      (key) => tabConfig[key].value === activeTab,
    ) || 'info'

  return (
    <Tabs value={activeTab} className={s.settings}>
      <TabsList className={s.tabsList}>
        {(Object.keys(tabConfig) as UrlTab[]).map((urlTab) => (
          <TabsTrigger
            key={urlTab}
            className={s.tabsTrigger}
            value={tabConfig[urlTab].value}
            onClick={() => handleTabChange(urlTab)}
            data-active={activeUrlTab === urlTab}
          >
            {tabConfig[urlTab].label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent className={s.content} value="generalInformation">
        <GeneralInformation />
      </TabsContent>

      <TabsContent className={s.content} value="devices">
        Devices
      </TabsContent>

      <TabsContent className={s.content} value="accountManagement">
        Account Management
      </TabsContent>

      <TabsContent className={s.content} value="myPayments">
        My payments
      </TabsContent>
    </Tabs>
  )
}
