## Dropdown Component

from [vue-dropdowns](https://github.com/mikerodham/vue-dropdowns)


#### Use => component.html
```html
<dropdown :options="objects"
          placeholder="select something!"
          @selected="updateSelected"/>
```

#### component.js
```js
import dropdown from "./components/dropdown";

export default {
  name: "App",
  components: {
    dropdown
  },
  data() {
    return {
      title: "Vue!",
      objects: [
        { title: 'Object One', value: 1 },
        { title: 'Object Two', value: 2 },
        { title: 'Object Three', value: 3 }
      ],
      selectedObject: {},
    };
  },
  methods: {
    updateSelected(obj) {
      this.selectedObject = obj;
      console.log(this.selectedObject.title);
    }
  }
};
```

#### dropdown.html
```html
  <div class='dropdown'>
    <div class="button btn" 
			@click="showMenu = !showMenu">
      
      <div class="title">{{selectedOption.title | titlecase}}</div>

      <div class="icon">arrow_drop_down</div>
    </div>

    <div class="menu" v-if="showMenu">
      <div class="option btn"
            v-for="(option, index) of options"
            :key="index" :value="option.value"
            @click="optionClick(option)">
        {{option.title}}
      </div>
    </div>   
  </div>
```

#### dropdown.js
```js
  export default {
    name: 'dropdown',
    props: {
      options: Array,
      placeholder: String
    },
    data() {
      return {
        showMenu: false,
        selectedOption: {},
      }
    },
    methods: {
      optionClick(option) {
        this.selectedOption = option;
        this.$emit('selected', option);
        this.showMenu = false;
      },
      setDefaults() {
        if (!this.options) {
          this.selectedOption = {
            value: undefined, title: "no options..."
           }
        } else if (this.placeholder) {
          this.selectedOption = {
            value: undefined, title: this.placeholder
          }
        } else {
          this.selectedOption = this.options[0];
        }
      }
    },
    mounted: function() {
      this.setDefaults();
    }
  };
  ```
  
  #### dropdown.css
  ```css
  @import '../scss/imports';
  
  .dropdown {
    position: relative;  
    display: inline-block !important;  
    min-width: 12rem;

    .button {
      display: grid;
      grid-auto-flow: column;
      justify-content: space-between;
      align-items: center;

      box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);     
      border-radius: 0.25rem; 
      padding: 0.5rem 1rem;
      padding-right: 0.5rem;   

      .icon {
        color: var(--muted-9);
      }
      
    }

    .menu {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 100;
    border-radius: 0.25rem; 
    box-shadow: 0 0 0 1px rgba(0,0,0,0.1),
    0px 2px 4px -1px rgba(0,0,0,0.1),
    0px 1px 10px 0px rgba(0,0,0,0.1);
    padding: 0;
    background: $backgroundColor;
      
      .option {
        border-radius: 0.25rem; 
          font-size: var(--h7);
          padding: 0.5rem 1rem;
        &:hover {
          background: rgba(0,0,0,0.1);
        }        
      }
    }
  } // dropdown
  ```
