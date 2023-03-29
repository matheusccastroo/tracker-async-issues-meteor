import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  this.showContent = new ReactiveVar(false);
  this.shouldShowContent = new ReactiveVar(false);

  Tracker.autorun(async (computation) => {
    // If you move this show to the line below the `await`, then it won't re-run when the reactive var changes.
    // However, it will work the first time.
    const show = this.shouldShowContent.get();

    // Simulate some async methods
    await Tracker.withComputation(computation, () => new Promise(r => setTimeout(r, 5000)));

    this.showContent.set(show);
  })
});

Template.hello.helpers({
  showContent() {
    return Template.instance().showContent.get();
  }
});

Template.hello.events({
  'click #show'(event, instance) {
    // If we want to manipulate the hidden content, this would work if we were not using async tracker
    instance.shouldShowContent.set(true);
    Tracker.flush();

    // But it fails here, because we don't have the guarantees anymore that the UI is updated.
    const selector = $("#hidden-content-main");
    if (!selector.length) {
      alert("Selector not found!")
    } else {
      selector.text("It worked!!")
    }
  },
  'click #hide'(event, instance) {
    instance.shouldShowContent.set(false);
    instance.showContent.set(false);
  },
});
