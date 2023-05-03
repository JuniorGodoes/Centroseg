import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OSComponent } from './os/os.component';
import { MenuComponent } from './menu/menu.component';
import { TesteComponent } from './teste/teste.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'os', component: OSComponent },
  { path: 'teste', component: TesteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
