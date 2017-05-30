import { Animation } from 'ionic-angular/animations/animation';
import { isPresent } from 'ionic-angular/util/util';
import { PageTransition } from 'ionic-angular/transitions/page-transition';

const DURATION = 10000;
const OPACITY = 'opacity';
const TRANSPARENT = 0;
const OPAQUE = 1;

export class SlideUpTransition extends PageTransition {

  init() {
      console.log("SlideUpTransition");
    super.init();

    const enteringView = this.enteringView;
    const leavingView = this.leavingView;
    const opts = this.opts;

    this.duration(isPresent(opts.duration) ? opts.duration : DURATION);

    const backDirection = (opts.direction === 'back');

    if (enteringView) {
        console.log("enteringView");
      const enteringPageEle: Element = enteringView.pageRef().nativeElement;

      const enteringContent = new Animation(this.plt,enteringView.pageRef());
      this.add(enteringContent);
      this.easing('ease').duration(1000); //effect 시간 
      if (backDirection) {
          enteringContent.fromTo(OPACITY, OPAQUE, OPAQUE, true);
          enteringContent.fromTo('translateY', '0%', '100%');          
      } else {
          enteringContent.fromTo(OPACITY, OPAQUE, OPAQUE, true);
          enteringContent.fromTo('translateY', '100%', '0%');
      }
    }

    if (leavingView && leavingView.pageRef()) {
      console.log("leavingView");

      const leavingPageEle: Element = leavingView.pageRef().nativeElement;
      const leavingContent = new Animation( this.plt,leavingView.pageRef());

      //this.add(leavingContent);

      if (backDirection) {
        //leavingContent.fromTo(OPACITY, OPAQUE, TRANSPARENT, false);
      } else {
        //leavingContent.fromTo(OPACITY, OPAQUE, OPAQUE, false);
      }
    }
  }

}

