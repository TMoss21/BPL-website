
  function openView(showID) {
      $("." + showID).toggle();
    }

    function sortTable(n) {

      var table, rows, i, x, y = 0;
      var compare1, compare2;
      table = document.getElementById("schInfoTable");
      switching = true;

      rows = table.querySelectorAll('tr.sort');
      
      var sortArr = [];

      for (i = 0; i < rows.length; i++) {
        x = rows[i];

        if (i + 1 in rows) y = rows[i + 1].previousElementSibling;
        else y = x.parentElement.lastChild;
        var obj = {
          sort: x.getElementsByTagName("TD")[n].textContent.toLowerCase(),
          range: document.createRange()
        };
        obj.range.setStartBefore(x);
        obj.range.setEndAfter(y);
        sortArr.push(obj);
      }
      function fnSortArrAsc(a, b) {
        if (a.sort > b.sort) return 1;
        else if (a.sort < b.sort) return -1;
        else return 0;
      }
      function fnSortArrDesc(a, b) {
        if (a.sort < b.sort) return 1;
        else if (a.sort > b.sort) return -1;
        else return 0;
      }

      compare1 = rows[0].getElementsByTagName("TD")[n].textContent.toLowerCase();
      compare2 = rows[rows.length-1].getElementsByTagName("TD")[n].textContent.toLowerCase();
      if(compare1 < compare2){
        sortArr = sortArr.sort(fnSortArrDesc);
      }else{
        sortArr = sortArr.sort(fnSortArrAsc);
      }
      
      frag = document.createDocumentFragment();
      for (i = 0; i < sortArr.length; i++) {
        x = sortArr[i];
        frag.appendChild(x.range.extractContents());
      }
      table.appendChild(frag);
    }

