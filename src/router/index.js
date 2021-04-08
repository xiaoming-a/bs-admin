import Vue from 'vue';
import VueRouter from 'vue-router';

const Main = () => import('../views/Main');
const CityEdit = () => import('../views/city/CityEdit')
const CityList = () => import('../views/city/CityList')
const HouseEdit = () => import('../views/house/HouseEdit')
const HouseList = () => import('../views/house/HouseList')
const ServiceEdit = () => import('../views/service/ServiceEdit')
const ServiceList = () => import('../views/service/ServiceList')
const AdministratorEdit = () => import('../views/administrator/AdministratorEdit')
const AdministratorList = () => import('../views/administrator/AdministratorList')
const StudentEdit = () => import('../views/student/StudentEdit')
const StudentList = () => import('../views/student/StudentList')
const LandlordEdit = () => import('../views/landlord/LandlordEdit')
const LandlordList = () => import('../views/landlord/LandlordList')
const ContractEdit = () => import('../views/contract/ContractEdit')
const ContractList = () => import('../views/contract/ContractList')
const PayEdit = () => import('../views/pay/PayEdit')
const PayList = () => import('../views/pay/PayList')

const Login = () => import('../views/login/Login')


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {isPublic: true}
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      //城市路由
      {
        path: '/cities/create',
        name: 'CityEdit',
        component: CityEdit,
      },
      {
        //注入_id
        path: '/cities/edit/:id',
        name: 'CityEdit',
        component: CityEdit,
        //CityEdit 组件 注入_id
        props: true
      },
      {
        path: '/cities/list',
        name: 'CityList',
        component: CityList,
      },

      //出租房路由
      {
        path: '/houses/create',
        name: 'HouseEdit',
        component: HouseEdit,
      },
      {
        path: '/houses/edit/:id',
        name: 'HouseEdit',
        component: HouseEdit,
        props: true
      },
      {
        path: '/houses/list',
        name: 'HouseList',
        component: HouseList,
      },

      //维修路由
      {
        path: '/services/create',
        name: 'ServiceEdit',
        component: ServiceEdit,
      },
      {
        path: '/services/edit/:id',
        name: 'ServiceEdit',
        component: ServiceEdit,
        props: true
      },
      {
        path: '/services/list',
        name: 'ServiceList',
        component: ServiceList,
      },

      //合同路由
      {
        path: '/contracts/create',
        name: 'ContractEdit',
        component: ContractEdit,
      },
      {
        path: '/contracts/edit/:id',
        name: 'ContractEdit',
        component: ContractEdit,
        props: true
      },
      {
        path: '/contracts/list',
        name: 'ContractList',
        component: ContractList,
      },

      //缴费路由
      {
        path: '/pays/create',
        name: 'PayEdit',
        component: PayEdit,
      },
      {
        path: '/pays/edit/:id',
        name: 'PayEdit',
        component: PayEdit,
        props: true
      },
      {
        path: '/pays/list',
        name: 'PayList',
        component: PayList,
      },

      //管理员路由
      {
        path: '/administrators/create',
        name: 'AdministratorEdit',
        component: AdministratorEdit,
      },
      {
        path: '/administrators/edit/:id',
        name: 'AdministratorEdit',
        component: AdministratorEdit,
        props: true
      },
      {
        path: '/administrators/list',
        name: 'AdministratorList',
        component: AdministratorList,
      },

      //学生路由
      {
        path: '/students/create',
        name: 'StudentEdit',
        component: StudentEdit,
      },
      {
        path: '/students/edit/:id',
        name: 'StudentEdit',
        component: StudentEdit,
        props: true
      },
      {
        path: '/students/list',
        name: 'StudentList',
        component: StudentList,
      },

      //房东路由
      {
        path: '/landlords/create',
        name: 'LandlordEdit',
        component: LandlordEdit,
      },
      {
        path: '/landlords/edit/:id',
        name: 'LandlordEdit',
        component: LandlordEdit,
        props: true
      },
      {
        path: '/landlords/list',
        name: 'LandlordList',
        component: LandlordList,
      },

    ]
  }
]

const router = new VueRouter({
  routes
})
//路由守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('./login')
  }
  next()
})

export default router
