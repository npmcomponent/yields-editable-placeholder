*This repository is a mirror of the [component](http://component.io) module [yields/editable-placeholder](http://github.com/yields/editable-placeholder). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/yields-editable-placeholder`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*

# editable-placeholder

  Editable placeholder.

## Installation

    $ component install yields/editable-placeholder

## Example

```html
<h1></h1>
<div></div>

<script>
  var placeholder = require('editable-placeholder')
    , div = document.querySelector('div')
    , h1 = document.querySelector('h1');

  div.contentEditable = true;
  h1.contentEditable = true;

  placeholder(h1, 'Type a title');
  placeholder(div, 'Type your post');
</script>
```


## License

  MIT
