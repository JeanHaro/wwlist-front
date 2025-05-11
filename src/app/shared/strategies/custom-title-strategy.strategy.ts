import { inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {

  private readonly title = inject(Title);

  constructor() {
    super();
  }

  override updateTitle (routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);

    (title) ? this.title.setTitle(`W&WList - ${title}` ) : this.title.setTitle('W&WList')
  }
}
