import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsComponent } from './posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';

const routerConfig: Routes = [
  
    { 
        path: 'login', 
        component: LoginComponent,
        title: 'Login' 

    },
    { path: 'register', component: RegisterComponent },
    { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] }, // Protected route
    {
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {
        path: 'details/:id',
        component: DetailsComponent,  
        title: 'Details page'
    },
   
    { 
        path: 'posts', 
        component: PostsComponent,
        title: 'Posts' 
    },
    { 
        path: '',
        component: PostsComponent,
        title: 'Posts' 
    },
    { 
        path: 'post/:id', 
        component: PostDetailComponent,
        title: 'Post Detail'
    },
    
    { path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [AuthGuard] 
    } // Protected route
];

export default routerConfig;