# AngularJS UIListView

##Installation
The installation is easy as `angular-ui-list-view` has minimal dependencies - only AngularJS and Bootstrap's CSS are required.

#####Installation via Bower
Install AngularJS UIListView with [Bower](https://github.com/bower/bower).

```shell
$ bower install angular-ui-list-view
```

This will install AngularJS and Bootstrap.

#####Manual installation
This directive depends on AngularJS and Bootstrap's CSS. Download dependencies above and then use minified or normal version.

Stylesheet with dependencies

```html
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
<link rel="stylesheet" href="bower_components/angular-ui-list-view/dist/css/angular-ui-list-view.css">
```

Script with dependencies

``` html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-ui-list-view/dist/js/angular-ui-list-view.js"></script>
```

Add `angular-ui-list-view` as a dependency to your application.

```js
angular.module('myApp', ['ngUIListView']);
```

##Usage
Simply add the `list-item` directive within each element with `.list` you'd like to have a list view. Optionally, you can use the `list-item` directive nest in an element with `.list-group`.

```html
<!-- List with optional group and divider -->
<div class="list">
  <div class="list-group">
    <div class="list-divider">[TEXT]</div>
    <list-item>
      ...
    </list-item>
  </div>
</div>
```

Add `.list-divider-reverse` for a `.list-divider` with right-aligned content.

##Components

###Plain & link item
```html
<!-- Plain -->
<list-item>[TEXT]</list-item>

<!-- Icon & Plain -->
<list-item class="item-icon">
  <i class="glyphicon glyphicon-heart-empty"></i>[TEXT]
</list-item>

<!-- Icon & Plain with badge -->
<list-item class="item-icon">
  <i class="glyphicon glyphicon-comment"></i>[TEXT]
  <div class="item-note">
    <div class="item-badge">1</div>
  </div>
</list-item>

<!-- Plain with label -->
<list-item class="item-label">
  <div>
    <div class="label">[TEXT]</div>
    <div>[TEXT]</div>
  </div>
</list-item>

<!-- Link -->
<list-item class="item-link">
  [TEXT]
  <div class="item-note">
    <i class="glyphicon glyphicon-menu-right"></i>
  </div>
</list-item>

<!-- Icon & Link -->
<list-item class="item-icon item-link">
  <i class="glyphicon glyphicon-bell"></i>[TEXT]
  <div class="item-note">
    <i class="glyphicon glyphicon-menu-right"></i>
  </div>
</list-item>
```

###Image item
```html
<!-- Image -->
<list-item class="item-image">
  <img src="http://placehold.it/50x50" alt="">
  <div>
    <div>[TEXT]</div>
    <p>[TEXT]</p>
  </div>
</list-item>

<!-- Image with note -->
<list-item class="item-image">
  <img src="http://placehold.it/50x50" alt="">
  <div>
    <div>[TEXT]</div>
    <p>[TEXT]</p>
  </div>
  <div class="item-note">
    <i class="glyphicon glyphicon-volume-off"></i>
    <div>[TEXT]</div>
  </div>
</list-item>
```

###Input
```html
<!-- Input -->
<list-item class="item-input">
  <item-input ng-model="[YOUR-MODEL]" placeholder=""></item-input>
</list-item>

<!-- Icon & Input -->
<list-item class="item-icon item-input">
  <i class="glyphicon glyphicon-user"></i>
  <item-input ng-model="[YOUR-MODEL]" placeholder=""></item-input>
</list-item>
```

#####Short doc for all input attributes:
* `ng-model`, the value to bind the input to
* `ng-model-options`, specifies what options the data binding must follow
* `type`, specifies the type attribute of an input element, Default is `text`
* `name`, specifies the name attribute of an input element
* `id`, specifies the id attribute of an input element
* `placeholder`, sets the floating label
* `ng-disabled`, specifies that an input element should be disabled

###Textarea
```html
<!-- Textarea -->
<list-item class="item-input">
  <item-textarea ng-model="[YOUR-MODEL]" placeholder=""></item-textarea>
</list-item>
```

#####Short doc for all textarea attributes:
* `ng-model`, the value to bind the textarea to
* `ng-model-options`, specifies what options the data binding must follow
* `name`, specifies the name attribute of an textarea element
* `id`, specifies the id attribute of an textarea element
* `placeholder`, sets the floating label
* `ng-disabled`, specifies that an textarea element should be disabled

###Stepper
```html
<!-- Stepper -->
<list-item class="item-input">
  <item-stepper ng-model="[YOUR-MODEL]" placeholder=""></item-stepper>
</list-item>

<!-- Icon & Stepper -->
<list-item class="item-icon item-input">
  <i class="glyphicon glyphicon-tags"></i>
  <item-stepper ng-model="[YOUR-MODEL]" placeholder=""></item-stepper>
</list-item>
```

#####Short doc for all stepper attributes:
* `ng-model`, the value to bind the stepper to
* `ng-model-options`, specifies what options the data binding must follow
* `name`, specifies the name attribute for the stepper
* `id`, specifies the id attribute for the stepper
* `placeholder`, sets the floating label
* `ng-disabled`, specifies that a stepper should be disabled
* `options`, override global defaults for given stepper, Object structure is `{ min: 1, max: 10 }`

#####Default options
You can override global defaults for the plugin's stepper with `ngUIListViewConfig.stepper`

#####Global defaults for the plugin's stepper:
| Name          | Type          | Default value               |
| ------------- | ------------- | --------------------------- |
| min           | number        | 0                           |
| max           | number        | 1000000                     |
| stepSize      | number        | 1                           |
| iconMinus     | string        | 'glyphicon glyphicon-minus' |
| iconPlus      | string        | 'glyphicon glyphicon-plus'  |

```js
angular.module('myApp', ['ngUIListView'])
.config(['ngUIListViewConfig', function(ngUIListViewConfig) {
  angular.extend(ngUIListViewConfig.stepper, {
    iconMinus: '[CUSTOM MINUS ICON]',
    iconPlus: '[CUSTOM PLUS ICON]'
  });
}]);
```

###Checkbox
```html
<!-- Checkbox with label -->
<list-item class="item-checkbox item-label">
  <item-checkbox ng-model="[YOUR-MODEL]" handle="[YOUR-UNIQUE-ID]" label="[LABEL-TEXT]">[TEXT]</item-checkbox>
</list-item>

<!-- Icon & Checkbox -->
<list-item class="item-icon item-checkbox">
  <i class="glyphicon glyphicon-plane"></i>
  <item-checkbox ng-model="[YOUR-MODEL]" handle="[YOUR-UNIQUE-ID]">[TEXT]</item-checkbox>
</list-item>

<!-- Multiple checkbox -->
<list-item class="item-icon item-checkbox">
  <i class="icon-check glyphicon glyphicon-ok"></i>
  <item-checkbox ng-model="[YOUR-MODEL]" ng-multiple="[RETURNING-ARRAY]" value="1">[TEXT]</item-checkbox>
</list-item>
<list-item class="item-icon item-checkbox">
  <i class="icon-check glyphicon glyphicon-ok"></i>
  <item-checkbox ng-model="[YOUR-MODEL]" ng-multiple="[RETURNING-ARRAY]" value="2">[TEXT]</item-checkbox>
</list-item>
```

#####Short doc for all checkbox attributes:
* `ng-model`, the value to bind the checkbox to
* `ng-model-options`, specifies what options the data binding must follow
* `ng-multiple`, the array that contains the values for the selected items
* `name`, specifies the name attribute of a checkbox
* `value`, specifies which value should be picked as `ng-multiple` array
* `handle`, specifies which checkbox is bound to
* `label`, sets a fixed label
* `ng-disabled`, specifies that a checkbox should be disabled

###Radio button
```html
<!-- Radio button with label -->
<list-item class="item-radio item-label">
  <item-radio ng-model="[YOUR-MODEL]" name="" value="1" label="[LABEL-TEXT]">[TEXT]</item-radio>
  <div class="item-note">
    <i ng-class="{'glyphicon glyphicon-ok': [YOUR-MODEL] == 1}"></i>
  </div>
</list-item>

<!-- Icon & Radio button -->
<list-item class="item-icon item-radio">
  <i class="glyphicon glyphicon-thumbs-up"></i>
  <item-radio ng-model="[YOUR-MODEL]" name="" value="2">[TEXT]</item-radio>
  <div class="item-note">
    <i ng-class="{'glyphicon glyphicon-ok': [YOUR-MODEL] == 2}"></i>
  </div>
</list-item>
```

#####Short doc for all radio button attributes:
* `ng-model`, the value to bind the radio button to
* `ng-model-options`, specifies what options the data binding must follow
* `name`, specifies the name attribute of a radio button
* `value`, sets the returning value
* `label`, sets a fixed label
* `ng-disabled`, specifies that a radio button should be disabled

###Reverse order
Add `.item-reverse` for a component with right-aligned content.

```html
<list-item class="item-reverse">
  ...
</list-item>
```

You can also add a reverse order of labels with the addition of `.item-label-reverse` and `.item-label`.

Reverse order of labels only work with plain & link items, checkbox and radio buttons.

```html
<list-item class="item-label item-label-reverse">
  ...
</list-item>
```

###Inset list
Add `.list-inset` for a `.list` if you'd like to have a inset list view.

```html
<div class="list list-inset">
  ...
</div>
```