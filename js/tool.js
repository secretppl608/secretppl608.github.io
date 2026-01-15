class book{
    constructor(worldMapLoad_book_id){
        this.id = worldMapLoad_book_id;
    }
    click(){
        $(`[data-book-id="${this.id}"]`).attr('data-book-status', 'open');
        const isR = localStorage.getItem((this.id).toString());
    }
    close(){
        $(`[data-book-id="${this.id}"]`).attr('data-book-status', 'close');
    }
}

class soil{
    constructor(){
        this.name = 'soil';
        this.id = 'game_entity_no_grass_soil';
        this.attr = {
            penetrating: false,
            canFire: false,
            oxygen: false,
            supportWalk: true,
            texture: '/assets/map.jpg',
            dangerous: false,
        }
    }
}

class no_oxygen_air{

}

class has_oxygen_air {

}
