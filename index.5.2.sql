-- 1번
SELECT `users`.`id`, `users`.`name`, `tickets`.`seat_number` FROM `tickets`
JOIN `users` ON `tickets`.`user` = `users`.`id` WHERE `tickets`.`train` = 11
ORDER BY `tickets`.`seat_number`;

-- 2번
SELECT  `users`.`id`, `users`.`name`, 
        COUNT(`tickets`.`id`) AS trains_count,
        SUM(`trains`.`distance`) AS total_distance 
FROM `users`
JOIN `tickets` ON `users`.`id` = `tickets`.`user`
JOIN `trains` ON `tickets`.`train` = `trains`.`id`
GROUP BY `users`.`id`
ORDER BY total_distance DESC
LIMIT 6;

-- 3번
SELECT  `trains`.`id`,  
        `types`.`name` AS `type`, 
        `src_station`.`name` AS `src_stn`, 
        `dst_station`.`name` AS `dst_stn`,
        TIMEDIFF(`trains`.`arrival`, `trains`.`departure`) AS `travel_time`
FROM `trains`
JOIN `types` ON `trains`.`type` = `types`.`id`
JOIN `stations` AS `src_station` ON `trains`.`source` = `src_station`.`id`
JOIN `stations` AS `dst_station` ON `trains`.`destination` = `dst_station`.`id`
ORDER BY travel_time DESC
LIMIT 6;

-- 4번
SELECT  `types`.`name` AS `type`,
        `src_station`.`name` AS `src_stn`,
        `dst_station`.`name` AS `dst_stn`,
        `trains`.`departure`,
        `trains`.`arrival`,
        ROUND(`trains`.`distance` * `types`.`fare_rate` / 1000) AS `fare`
FROM `trains`
JOIN `types` ON `trains`.`type` = `types`.`id`
JOIN `stations` AS `src_station` ON `trains`.`source` = `src_station`.`id`
JOIN `stations` AS `dst_station` ON `trains`.`destination` = `dst_station`.`id`
ORDER BY `trains`.`departure`;

-- 5번
SELECT  `trains`.`id`,
        `types`.`name` AS `type`,
        `src_station`.`name` AS `src_stn`,
        `dst_station`.`name` AS `dst_stn`,
        COUNT(`tickets`.`id`) AS `occupied`,
        `types`.`max_seats` AS `maximum`
FROM `trains`
JOIN `types` ON `trains`.`type` = `types`.`id`
JOIN `stations` AS `src_station` ON `trains`.`source` = `src_station`.`id`
JOIN `stations` AS `dst_station` ON `trains`.`destination` = `dst_station`.`id`
JOIN `tickets` ON `trains`.`id` = `tickets`.`train`
GROUP BY `trains`.`id`, `types`.`name`, `src_station`.`name`, `dst_station`.`name`, `types`.`max_seats`
ORDER BY `trains`.`id`;

-- 6번
SELECT  `trains`.`id`,
        `types`.`name` AS `type`,
        `src_station`.`name` AS `src_stn`,
        `dst_station`.`name` AS `dst_stn`,
        COUNT(`tickets`.`id`) AS `occupied`,
        `types`.`max_seats` AS `maximum`
FROM `trains`
JOIN `types` ON `trains`.`type` = `types`.`id`
JOIN `stations` AS `src_station` ON `trains`.`source` = `src_station`.`id`
JOIN `stations` AS `dst_station` ON `trains`.`destination` = `dst_station`.`id`
LEFT JOIN `tickets` ON `trains`.`id` = `tickets`.`train`
GROUP BY `trains`.`id`, `types`.`name`, `src_station`.`name`, `dst_station`.`name`, `types`.`max_seats`
ORDER BY `trains`.`id`;