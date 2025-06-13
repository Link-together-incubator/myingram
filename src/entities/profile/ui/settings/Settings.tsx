'use client'

import { UserProfile } from '@/entities/profile/model/profile.types'
import { GeneralInformation } from '@/entities/profile/ui/settings/GeneralInformation/GeneralInformation'
import { Button } from '@/shared/ui'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/Tabs/Tabs'

import s from './Settings.module.scss'

type Props = {
  setOpenSettings: (open: boolean) => void
  profile: UserProfile
}

export const Settings = ({ setOpenSettings, profile }: Props) => {
  return (
    <Tabs defaultValue={'generalInformation'} className={s.settings}>
      <TabsList className={s.tabsList}>
        <TabsTrigger className={s.tabsTrigger} value="generalInformation">
          General information
        </TabsTrigger>
        <TabsTrigger className={s.tabsTrigger} value="devices">
          Devices
        </TabsTrigger>
        <TabsTrigger className={s.tabsTrigger} value="accountManagement">
          Account Management
        </TabsTrigger>
        <TabsTrigger className={s.tabsTrigger} value="myPayments">
          My payments
        </TabsTrigger>
        <Button
          className={s.btnBack}
          variant={'secondary'}
          onClick={() => setOpenSettings(false)}
        >
          Back
        </Button>
      </TabsList>

      <TabsContent className={s.content} value={'generalInformation'}>
        <GeneralInformation profile={profile} />
      </TabsContent>

      <TabsContent className={s.content} value={'devices'}>
        Devices
      </TabsContent>

      <TabsContent className={s.content} value={'accountManagement'}>
        Account Management
      </TabsContent>

      <TabsContent className={s.content} value={'myPayments'}>
        My payments
      </TabsContent>
    </Tabs>
  )
}
