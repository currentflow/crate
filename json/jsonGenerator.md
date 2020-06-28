[JSON Generator](https://next.json-generator.com/VkOJPjWCd)

``` js
[
  {
    'repeat(20)': {
      id: '{{objectId().slice(-6)}}',
      name: {
        first: '{{firstName()}}',
        last: '{{surname()}}'
      },
      animal(tags) {
        
        const animals = ['leopard', 'elephant', 'dolphin', 'marmot',
                        'frog', 'eagle', 'sloth', 'turtle',
                        'gecko', 'seal', 'otter', 'fox',
                        'salamander', 'Jaguar', 'badger', 'antelope',
                        'cougar', 'coyote', 'bear'];
        return animals[tags.integer(0, animals.length - 1)];
      },
      bird(tags) {
        const birds = ['grebe', 'eagle', 'cuckoo','owl', 
                       'toucan', 'kingfisher', 'duck', 'egret',
                       'osprey', 'Hawk', 'buzzard', 'Wren',
                       'swallow'];
        return birds[tags.integer(0, birds.length - 1)];
      },
      istrue: '{{bool()}}',
      number: '{{floating(0, 1, 4)}}',
      color(tags) {
        const colors = ['red', 'orange', 'yellow', 
                        'green', 'cyan', 'blue', 
                        'violet', 'brown'];
        return colors[tags.integer(0, colors.length - 1)];
      },
      lorem: "{{lorem(1, 'sentences')}}"
    }
  }
]
```
