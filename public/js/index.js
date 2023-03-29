$(document).ready(function () {
  let counter = 1;

  $("#addButton").click(function () {
    let newTextBox = $(document.createElement("div"))
      .attr("class", "row g-3")
      .attr("id", "form" + counter);

    newTextBox
      .after()
      .html(
        "<div class=" +
          '"row g-3"' +
          "><div class=" +
          '"col-md-6"' +
          "><input type=" +
          '"text"' +
          "class=" +
          '"form-control"' +
          "name=" +
          '"name' + counter + '"' +
          "placeholder=" +
          '"name"' +
          "/></div><div class=" +
          '"col-md-2"' +
          "><input type=" +
          '"number"' +
          "class=" +
          '"form-control"' +
          "name=" +
          '"quantity' + counter + '"' +
          "placeholder=" +
          '"quantity"' +
          "/></div></div>"
      );

    newTextBox.appendTo("#form-ingredient");

    counter++;
  });

  $("#deleteButton").click(function () {
    if (counter == 1) {
      alert("No more textbox to remove");
      return false;
    }

    counter--;

    $("#form" + counter).remove();
  });

  $(".grid-hover").hover(
    function () {
      $(this).css("background-color", "#ededed");
    },
    function () {
      $(this).css("background-color", "transparent");
    }
  );

  $(".del").click(function () {
    if (!confirm("Do you want to delete")) {
      return false;
    }
  });

  $("#logout").click(function () {
    if (!confirm("Do you want to logout")) {
      return false;
    }
  });

  $(".input-profile").prop("disabled", true);

  $(".pwd-verif").hide();

  $("#hide-update").click(function () {
    $(".pwd-verif").hide();
    $(".btn-show-update").show();
    $(".input-profile").prop("disabled", true);
    $(".pwd-null").val("aaaaaa");
  });

  $("#show-update").click(function () {
    $(".pwd-verif").show();
    $(".btn-show-update").hide();
    $(".input-profile").prop("disabled", false);
    $(".pwd-null").val("");
  });

  //   let sliderImages = document.querySelectorAll(".slide"),
  //     arrowLeft = document.querySelector("#arrow-left"),
  //     arrowRight = document.querySelector("#arrow-right"),
  //     current = 0;

  //   // Clear all images
  //   function reset() {
  //     for (let i = 0; i < sliderImages.length; i++) {
  //       sliderImages[i].style.display = "none";
  //     }
  //   }

  //   // Initial slide
  //   function startSlide() {
  //     reset();
  //     sliderImages[0].style.display = "block";
  //   }

  //   // Show previous
  //   function slideLeft() {
  //     reset();
  //     sliderImages[current - 1].style.display = "block";
  //     current--;
  //   }

  //   // Show next
  //   function slideRight() {
  //     reset();
  //     sliderImages[current + 1].style.display = "block";
  //     current++;
  //   }

  //   // Left arrow click
  //   arrowLeft.addEventListener("click", function () {
  //     if (current === 0) {
  //       current = sliderImages.length;
  //     }
  //     slideLeft();
  //   });

  //   // Right arrow click
  //   arrowRight.addEventListener("click", function () {
  //     if (current === sliderImages.length - 1) {
  //       current = -1;
  //     }
  //     slideRight();
  //   });

  //   startSlide();
});
