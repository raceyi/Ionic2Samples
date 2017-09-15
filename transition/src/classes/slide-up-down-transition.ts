import { Animation } from 'ionic-angular/animations/animation';
import { isPresent } from 'ionic-angular/util/util';
import { PageTransition } from 'ionic-angular/transitions/page-transition';

const DURATION = 500;
const OPACITY = 'opacity';
const TRANSPARENT = 0;
const OPAQUE = 1;

export class SlideUpDownTransition extends PageTransition {

  init() {
      console.log("SlideUpTransition");
    super.init();

    const enteringView = this.enteringView;
    const leavingView = this.leavingView;
    const opts = this.opts;

    this.duration(isPresent(opts.duration) ? opts.duration : DURATION);

    const backDirection = (opts.direction === 'back');

    if (enteringView) {
      const enteringPageEle: Element = enteringView.pageRef().nativeElement;

      const enteringContent = new Animation(this.plt,enteringView.pageRef());
      this.add(enteringContent);
      if (!backDirection) {
          enteringContent.fromTo(OPACITY, OPAQUE, OPAQUE, true);
          enteringContent.fromTo('translateY', '100%', '0%');
      }
    }

    if (leavingView && leavingView.pageRef()) { 
      const leavingPageEle: Element = leavingView.pageRef().nativeElement;
      const leavingContent = new Animation( this.plt,leavingView.pageRef());

      this.add(leavingContent);

      if (backDirection) {
            leavingContent.fromTo(OPACITY, OPAQUE, TRANSPARENT, false);
            leavingContent.fromTo('translateY', '0%', '100%');          
      }
    }

  }

}

