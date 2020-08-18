import {config} from "../config";
import {Article, Room, Wall} from "../types";
import {post} from "./fetch";

export const apply = (room: Room, article: Article) => {
    let updateWalls: any = [];
    let updateFloor: any = [];

    switch (article.type) {
        case "wall": {
            room.walls.forEach((wall: Wall) => {
                updateWalls.push({
                    wall_id: wall.wall_id,
                    is_active: true,
                    wallpaper: article
                })
            });
            break;
        }
        case "floor": {
            room.walls.forEach((wall: Wall) => {
                updateWalls.push({
                    wall_id: wall.wall_id,
                    is_active: false,
                })
            });
            updateFloor = {
                covering: article
            };
            break;
        }
    }

    let data = {
        room_data: {
            room: {
                id: room.uuid,
                image_path: room.image_path,
                walls: updateWalls,
                floor: updateFloor

            }
        }
    };

    return post(`${config.INTERIORS_HOST}/apply/?resize=large`, JSON.stringify(data),{'Content-Type': 'application/json', Authorization: config.TOKEN});
};

