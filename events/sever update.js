//2024년도 송지후
//위 코드는 "로이드샵" 의 저작권에 귀속되기에 무단 배포 , 판매를 금지합니다.

const { Events, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { admin } = require('../config.json')
module.exports = {
    name: Events.MessageCreate,
    /**
     * @param {Message} message 
     */
    async run(message) {
                
        if (message.content !== '!서버업뎃') return;

        message.delete()

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Blue')
                    .setTitle('✨ 서버업뎃')
                    .setFields({
                        name : "서버업데이트" , value : "서버가 업데이트중입니다. 펭귄서버 미래를 기대해주세요."

                    })
                    .setThumbnail("https://i.ibb.co/kXjxhGg/image.png")
            ]
        })
    }
}
// Discord.js 버전 14 이상을 사용 중이어야 합니다.
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// 버튼 추가를 위한 Action Row와 Button 생성
const actionRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setLabel('펭귄서버 바로가기') // 버튼에 표시될 텍스트
            .setStyle(ButtonStyle.Link) // 버튼 스타일을 '링크'로 설정
            .setURL('cfx.re/join/y8obk9') // 버튼 클릭 시 이동할 URL
    );

// 임베드 전송 (기존의 임베드 생성 코드 아래에 추가)
channel.send({ embeds: [yourEmbed], components: [actionRow] });
