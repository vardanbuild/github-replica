import React from 'react'
import { Tab, Tabs } from "@blueprintjs/core";

import Repository from '../Repository/Repository'

const ProfileTabs = () => {

    const onTabChange = (id) => {}

    return(
       <Tabs id="profileTabs" onChange={onTabChange} selectedTabId="tabRepositories"  className={"tabs"}>
            <Tab id="tabOverview" title="Overview" panel={null}/>
            <Tab id="tabRepositories" title="Repositories" panel={<Repository />} />
            <Tab id="tabProjects" title="Projects" panel={null}/>
            <Tab id="tabPackages" title="Packages" panel={null}/>
        </Tabs>
    )
}

export default ProfileTabs