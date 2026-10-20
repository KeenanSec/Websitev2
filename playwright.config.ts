import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',use:{baseURL:'http://localhost:4321'},webServer:{command:'npm run dev -- --host 127.0.0.1',url:'http://localhost:4321',reuseExistingServer:!process.env.CI},projects:[{name:'desktop',use:{viewport:{width:1672,height:941}}},{name:'mobile',use:{viewport:{width:390,height:844}}}]});
