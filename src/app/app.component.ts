import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  ngOnInit() {
    if (window.screen.width < 768) {
      this.mobile = true;
    }
    if (localStorage.getItem('storage') !== null) {
      for (let i = 0; i < this.sectionsArr.length; i++) {
        for (let j = 0; j < this.actionsArr.length; j++) {
          if (JSON.parse(localStorage.getItem('storage'))[i].permission[this.actionsArr[j]] === true) {
            this.triggers.actions[this.actionsArr[j]]++;
            this.triggers.sections[this.sectionsArr[i]]++;
          }
        }
      }
    }
    for (let i = 0; i < this.actionsArr.length; i++) {
      if ((this.triggers.actions[this.actionsArr[i]] === this.triggers.actions[this.actionsArr[i + 1]]) && this.triggers.actions[this.actionsArr[i]] !== 0) {
        this.triggers.checkAll[`${this.actionsArr[i + 1]}All`] = true;
      } else {
        this.triggers.checkAll[`${this.actionsArr[i + 1]}All`] = false;
      }
    }
  }
  mobile = false;
  triggers = {
    sections: {
      calendar: 0,
      profile: 0,
      property: 0,
      contacts: 0
    },
    actions: {
      view: 0,
      edit: 0,
      remove: 0
    },
    checkAll: {
      viewAll: false,
      editAll: false,
      removeAll: false
    }
  }
  sectionsArr = ['calendar', 'profile', 'property', 'contacts'];
  actionsArr = ['view', 'edit', 'remove'];
  currentAction = '';
  currentNumber = 0;
  clicked(event) {
    console.log(window)
    for (let i = 0; ; i++) {
      if (event.target.dataset.id[i] === '-') {
        this.currentAction = event.target.dataset.id.slice(0, i);
        this.currentNumber = event.target.dataset.id.slice(i+1, event.target.dataset.id.length);
        break;
      }
      if ((event.target.dataset.id[i] + event.target.dataset.id[i + 1] + event.target.dataset.id[i + 2]) === 'All') {
        this.currentAction = event.target.dataset.id.slice(0, i);
        break;
      }
    }
    if (event.target.checked) {
      if (this.currentNumber === 0) {
        this.triggers.checkAll[`${this.currentAction}All`] = true;
        for (let i = 0; i < this.sectionsArr.length; i++) {
          if (this.actionsArr.indexOf(this.currentAction) === this.triggers.sections[this.sectionsArr[i]]) {
            this.triggers.sections[this.sectionsArr[i]]++;
            this.triggers.actions[this.currentAction]++;
          }
        }
      } else {
        this.triggers.sections[this.sectionsArr[this.currentNumber - 1]]++;
        if (this.actionsArr.length > (this.actionsArr.indexOf(this.currentAction))) {
          this.triggers.actions[this.currentAction]++;
        }
      }
    } else {
      if (this.currentNumber === 0) {
        this.triggers.checkAll[`${this.currentAction}All`] = false;
        for (let i = 0; i < this.sectionsArr.length; i++) {
          let dif = this.triggers.sections[this.sectionsArr[i]] - (this.actionsArr.indexOf(this.currentAction) + 1);
          for (let j = 0; j <= dif; j++) {
            this.triggers.sections[this.sectionsArr[i]]--;
            this.triggers.actions[this.actionsArr[(this.actionsArr.indexOf(this.currentAction)) + j]]--;
          }
        }
      } else {
        let dif = this.triggers.sections[this.sectionsArr[this.currentNumber - 1]] - this.actionsArr.indexOf(this.currentAction);
        for (let i = 0; i < dif; i++) {
          this.triggers.sections[this.sectionsArr[this.currentNumber - 1]]--;
          this.triggers.actions[this.actionsArr[(this.actionsArr.indexOf(this.currentAction)) + i]]--;
        }
      }
    }
    for (let i = 0; i < this.actionsArr.length; i++) {
      if ((this.triggers.actions[this.actionsArr[i]] === this.triggers.actions[this.actionsArr[i + 1]]) && this.triggers.actions[this.actionsArr[i]] !== 0) {
        this.triggers.checkAll[`${this.actionsArr[i + 1]}All`] = true;
      } else {
        this.triggers.checkAll[`${this.actionsArr[i + 1]}All`] = false;
      }
    }
    this.currentNumber = 0;
    console.log(this.triggers.actions);
    console.log(this.triggers.sections);
    console.log(document)
  }
}
