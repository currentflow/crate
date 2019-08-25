## Dropdown Component

from [vue-dropdowns](https://github.com/mikerodham/vue-dropdowns)


#### Use => component.html
```html
<dropdown :options="objects" 
          :selected="objects[0]" 
          @updateOption="updateSelected"/>
```

#### component.js
```js
data() {
  return {
    title: "Vue!",
    objects: [
      { title: 'Object One' },
      { title: 'Object Two' },
      { title: 'Object Three' }
    ],
    selectedObject: {},
  };
},
methods: {
  updateSelected(obj) {
    console.log(obj);
    this.selectedObject = obj;
  }
}
```

#### dropdown.html
```html
<template>
  <div class="dropdown">

    <li v-if="selectedOption.title !== undefined"
        @click="showMenu = !showMenu;" 
        class="dropdown-btn">
          
      <span class="title">{{ selectedOption.title }}</span>
      <span class="caret"></span>
    </li>

    <li v-if="selectedOption.title === undefined"
        @click="showMenu = !showMenu;" 
        class="dropdown-btn">
          {{placeholderText}}
      <span class="caret"></span>
    </li>

    <ul v-if="showMenu"
        class="dropdown-menu">

      <li v-for="(option, index) in options" 
          :key="index">

        <a @click="updateOption(option)"
            href="javascript:void(0)" >
            {{ option.title }}
        </a>
      </li>
    </ul>

  </div>
</template>
```

#### dropdown.js
```js
  export default {
    name: 'dropdown',
    data() {
      return {
        showMenu: false,
        placeholderText: 'Select an item',
        selectedOption: {}
      }
    },
    props: {
      options: {
        type: [Array, Object]
      },
      selected: {},
      placeholder: [String]
    },
    mounted() {
      this.selectedOption = this.selected;
      if (this.placeholder)
      {
        this.placeholderText = this.placeholder;
      }
    },
    methods: {
      updateOption(option) {
        this.selectedOption = option;
        this.showMenu = false;
        this.$emit('updateOption', this.selectedOption);
      }
    }
  }
  ```
  
  #### dropdown.css
  ```css
@import '../scss/imports';

.dropdown {

  --fg: #409FCB;
  --bg: #e1e1e1;

  position: relative;
  display: inline-block;

  a, a:hover {
    text-decoration: none;
  }
  
  li {
    list-style: none;
    margin: 0;
  }

  .dropdown-btn {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;

    color: inherit;
    font-weight: inherit;
    text-transform: none;
    min-width: 14rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    border-radius: 0;
    cursor: pointer;
    
    &:hover {
      color: var(--fg);
      border-color: var(--fg);
      background: var(--bg);
    }
    
    
    .caret {
      width: 0;
      height: 0;
      position: relative;
      top: -0.1rem;
      /* margin-left: 2px; */
      /* vertical-align: middle; */
      border-top: 0.4rem dashed;
      border-top: 0.4rem solid;
      border-right: 0.4rem solid transparent;
      border-left: 0.4rem solid transparent;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 100;
    min-width: 160px;
    list-style: none;
    font-size: var(--h7);
    background-color: #fff;
    border-radius: 0.2rem;
    @include shadow(4);

    li {      
      position: relative;
      width: 100%;
      overflow: hidden;

      a {
        padding: 1rem;
        display: block;
        color: currentColor;
        white-space: nowrap;
      }
      a:hover {
        color: var(--fg);
        background: var(--bg);
      }
    }
    
  }
  
} // dropdown //
  ```
