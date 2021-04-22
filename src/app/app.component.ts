import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <chat-config [(theme)]="theme"></chat-config>
    <chat-widget [theme]="theme"
    [merchantId]="merchantId"
    [appEnv]="appEnv" [agentEnv]="agentEnv"
    [agentAvatar]="agentAvatar"></chat-widget>
  `,
})
export class AppComponent {
  public theme = 'blue';
  public merchantId = 'pH5vsgNnJQzP820kfDia';
  public agentId = undefined;
  public appEnv = 'dev';
  public agentEnv = 'draft';
  public agentAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSizNXYNqbrQi0WK9GAdC-DCwf1z_gY1kwpYQ&usqp=CAU';
}
