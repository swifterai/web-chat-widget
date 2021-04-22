import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { fadeIn, fadeInOut } from '../animations';
import { ChatService } from '../chat.service';

const rand = max => Math.floor(Math.random() * max);
const generateGUID = () => {
  const a = function (): string {
    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
  };
  return a() + '-' + a() + '-' + a();
};

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {

  @ViewChild('bottom') bottom: ElementRef;

  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue';
  @Input() public merchantId: string;
  @Input() public agentId?: string;
  @Input() public appEnv: string;
  @Input() public agentEnv: string;
  @Input() public agentAvatar: string;


  public init = true;
  public _visible = false;
  public operator: { name: string; status: string; avatar: string; };
  public client: { userId: string; name: string; status: string; avatar: string; };

  public get visible() {
    return this._visible;
  }

  @Input() public set visible(visible) {
    this._visible = visible;
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom();
        this.focusMessage();
      }, 0);
    }
  }

  public focus = new Subject();
  public messages = [];

  /**
   *
   */
  constructor(private _chatService: ChatService) {

    console.log('merchantId: ', this.merchantId);

  }


  ngOnInit() {

    this.operator = {
      name: 'Operator',
      status: 'online',
      avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
    };

    this.client = {
      userId: generateGUID(),
      name: 'Guest User',
      status: 'online',
      avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
    };
  }

  public addMessage(from, text, type: 'received' | 'sent') {
    this.messages.push({
      from,
      text,
      type,
      date: new Date().getTime(),
    });
    this.scrollToBottom();
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      setTimeout(() => {
        this.bottom.nativeElement.scrollIntoView();
      }, 500);
    }
  }

  public focusMessage() {
    this.focus.next(true);
  }

  public async getMessage(userId: string, message: string) {
    const response = await this._chatService.callAgent(userId, message, this.merchantId, this.agentId, this.appEnv, this.agentEnv);
    this.addMessage(this.operator, response, 'received');
  }

  public toggleChat() {
    this.operator.avatar = this.agentAvatar ||
      `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`;

    this.visible = !this.visible;
    if (this.init) {
      this.init = false;
      this._chatService.callAgent(this.client.userId, 'Hi', this.merchantId, this.agentId, this.appEnv, this.agentEnv)
        .then(response => {

          this.addMessage(this.operator, response, 'received');
        });
    }
  }

  public sendMessage({ message }) {
    if (message.trim() === '') {
      return;
    }
    this.addMessage(this.client, message, 'sent');
    this.getMessage(this.client.userId, message.trim());
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage();
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat();
    }
  }

}
