$(document).dblclick(e => {
  const highlightedTextNode = window.getSelection();
  const highlightedText = highlightedTextNode.toString();
  const range = highlightedTextNode.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  $.get(
    `https://www.urbandictionary.com/define.php?term=${highlightedText}`,
    response => {
      const matchedDefinition = response.match(
        /<div class="meaning">[\s|\S]*<\/div>/g
      )[0];

      const matchedExample = response.match(
        /<div class="example">[\s|\S]*<\/div>/g
      )[0];

      const definitionInnerStuff = $.parseHTML(matchedDefinition)[0].innerHTML;
      const exampleInnerStuff = $.parseHTML(matchedExample)[0].innerHTML;

      const $outerDiv = $('<div></div>');
      $outerDiv.css({
        'font-size': '1rem',
        'background-color': 'white',
        'z-index': '10000',
        border: '1px solid black',
        'box-shadow': '0 0 2rem grey',
        padding: '1rem',
        color: 'black',
        position: 'absolute',
        top: rect.top + window.scrollY + 'px',
        left: rect.left + 'px',
        'max-height': '20rem',
        width: '20rem',
        'overflow-y': 'scroll'
      });
      const $title = $(`<h2>${highlightedText}</h2>`);
      const $definitionTitle = $('<h4>Definition:</h4>');

      const $definitionDiv = $('<div></div>');
      $definitionDiv.append(definitionInnerStuff);
      $definitionDiv.css({
        'margin-bottom': '1rem'
      });

      const $exampleTitle = $('<h4>Example:</h4>');
      const $exampleDiv = $('<div></div>');
      $exampleDiv.append(exampleInnerStuff);

      const innerStuffs = [
        $title,
        $definitionTitle,
        $definitionDiv,
        $exampleTitle,
        $exampleDiv
      ];

      innerStuffs.forEach(innerStuff => {
        $outerDiv.append(innerStuff);
      });

      $outerDiv.click(e => {
        e.stopPropagation();
      });
      $(document.body).append($outerDiv);
      $(document).click(e => {
        $outerDiv.detach();
      });
    }
  );
});
