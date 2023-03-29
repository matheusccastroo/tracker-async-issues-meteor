### Tracker async issues

This repository shows two issues found when using
the async tracker from Meteor

- `Tracker.flush()` doesn't respect the guarantee that UI updates will be applied after it returns ([tracker-manual](https://github.com/meteor/docs/blob/master/long-form/tracker-manual.md#the-flush-cycle)).
- Async autoruns are not getting re-run after the first time when a reactive data-source changes.

To run the example, clone it and then do a `cd tracker-async-issues-meteor && meteor npm install && meteor`