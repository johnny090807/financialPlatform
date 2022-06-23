import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let faq = document.getElementsByClassName("faq-page");
    let element:any;

    for (let i = 0; i < faq.length; i++) {
      faq[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        faq[i].classList.toggle("active")
        element = faq[i]

        /* Toggle between hiding and showing the active panel */
        let body = element.nextElementSibling;
        if (body.style.display === "block") {
          body.style.display = "none";
        } else {
          body.style.display = "block";
        }
      });
    }

  }

}
