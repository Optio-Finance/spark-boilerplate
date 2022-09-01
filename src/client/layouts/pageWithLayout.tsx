import { NextPage } from 'next';
import DashboardLayout from './dashboardLayout';
import LandingLayout from './landingLayout';

type PageWithDashboardLayout = NextPage & { layout: typeof DashboardLayout };
type PageWithLandingLayout = NextPage & { layout: typeof LandingLayout };

type PageWithLayoutType = PageWithDashboardLayout
  | PageWithLandingLayout;

export default PageWithLayoutType;