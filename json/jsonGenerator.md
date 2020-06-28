[JSON Generator](https://next.json-generator.com/VkOJPjWCd)

``` js
[
  {
    'repeat(5, 10)': {
      id: '{{objectId().slice(-6)}}',
      name: {
        first: '{{firstName()}}',
        last: '{{surname()}}'
      },
      animal(tags) {
        
        const animals = ['Leopard', 'Elephant', 'Dolphin', 'Marmot',
                        'Frog', 'Eagle', 'Sloth', 'Turtle',
                        'Gecko', 'Seal', 'Otter', 'Fox',
                        'Salamander', 'Jaguar', 'Badger', 'Antelope',
                        'Cougar', 'Coyote', 'Bear'];
        return animals[tags.integer(0, animals.length - 1)];
      },
      bird(tags) {
        const birds = ['Grebe', 'Eagle', 'Cuckoo','Owl', 
                       'Toucan', 'Kingfisher', 'Duck', 'Egret',
                       'Osprey', 'Hawk', 'Buzzard', 'Wren',
                       'Swallow'];
        return birds[tags.integer(0, birds.length - 1)];
      },
      isTrue: '{{bool()}}',
      number: '{{floating(0, 1, 4)}}',
      color(tags) {
        const colors = ['red', 'orange', 'yellow', 
                        'green', 'cyan', 'blue', 
                        'violet', 'brown'];
        return colors[tags.integer(0, colors.length - 1)];
      },
      lorem: '{{lorem(1, sentences)}}'
    }
  }
]
```
