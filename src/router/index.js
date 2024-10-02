import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import AccessDeniedView from '../views/AccessDeniedView.vue';
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
import AddBookView from '@/views/AddBookView.vue';
import UserDashboard from '@/views/UserDashboard.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import logoutView from '@/views/logoutView.vue';
import { getAuth } from 'firebase/auth';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import GetBookCountView from '@/views/GetBookCountView.vue';
import Weather from '@/views/Weather.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } // Protecting the About page
  },
  {
    path: '/Weather',
    name: 'Weather',
    component: Weather
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  },
  {
    path: '/logoutView',
    name: 'logout',
    component: logoutView
  },
  {
    path: '/bookcount',
    name: 'BookCount',
    component: GetBookCountView,

  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,

  },
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, roles: ['user'] } // Restricting UserDashboard to users
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['admin'] } // Restricting AdminDashboard to admins
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userRole = userDoc.exists() ? userDoc.data().role : null;

      if (to.matched.some(record => record.meta.roles) && !to.meta.roles.includes(userRole)) {
        next('/access-denied');
      } else {
        next();
      }
    } else {
      next('/FireLogin');
    }
  } else {
    next();
  }
});

export default router;
