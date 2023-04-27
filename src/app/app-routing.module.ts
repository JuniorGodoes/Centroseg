import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OSComponent } from './os/os.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'os', component: OSComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
