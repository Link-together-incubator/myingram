'use client'
import s from './Settings.module.scss'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/Tabs/Tabs'
import { GeneralInformation } from '@/entities/profile/ui/settings/GeneralInformation/GeneralInformation'
import {Button} from "@/shared/ui";

type Props = {
    setOpenSettings: (open: boolean) => void
}

export const Settings = ({setOpenSettings}: Props ) => {
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
                  <Button className={s.btnBack} variant={'secondary'} onClick={() => setOpenSettings(false)}>Back</Button>
              </TabsList>

              <TabsContent className={s.content} value={'generalInformation'}>
                  <GeneralInformation />
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
