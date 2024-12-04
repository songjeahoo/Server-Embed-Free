//2024년도 송지후
//위 코드는 "로이드샵" 의 저작권에 귀속되기에 무단 배포 , 판매를 금지합니다.
const { Events, ChatInputCommandInteraction, ComponentType, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const { CaptchaGenerator, Captcha } = require('captcha-canvas');
const { role } = require('../config.json')
const crypto = require('crypto');

function random(number) {
    var result = '';
    const msg = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < number; i++) {
        result += msg.charAt(Math.floor(Math.random() * msg.length));
    }
    return result;
}

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async run(interaction) {
        if (interaction.customId !== 'dlswmd') return
        await interaction.deferReply({ ephemeral: true });

        if (interaction.member.roles.cache.has(role)) {
            return await interaction.editReply({ content: '이미 인증이 되어있습니다!' })
        }

        const captcha = new CaptchaGenerator();


        captcha.setCaptcha({ color: '#ffffff' });
        captcha.setTrace({ color: '#ffffff' });


        const imageBuffer = new AttachmentBuilder(captcha.generateSync({ textColor: "#ffffff" }), { name: `img.png`, });

        const hex = crypto.randomBytes(6).toString("hex");
        let Tf = false

        const select = new StringSelectMenuBuilder()
            .setCustomId(hex)
            .setPlaceholder('캡차 이미지와 동일한 문자를 선택 주세요!')
            .setMaxValues(1)
            .setMaxValues(1);

        const list = [random(captcha.captcha.text.length).toUpperCase(), random(captcha.captcha.text.length).toUpperCase(), random(captcha.captcha.text.length).toUpperCase(), captcha.captcha.text]

        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        list.forEach((data) => {
            select.addOptions({
                label: data,
                value: data,
            });
        });

        const embed = new EmbedBuilder()
            .setAuthor({ name: "인증", iconURL: interaction.user.avatarURL() })
            .setTitle("셀렉트 메뉴 을 눌러 캡차 이미지와 동일한 문자를 선택 주세요!")
            .setImage("attachment://img.png")
            .setColor("Green")
            .setFooter({ text: "쿨타임 : 20초" })

        const Message = await interaction.editReply({ embeds: [embed], files: [imageBuffer], components: [new ActionRowBuilder().addComponents(select)] })

        const collector = Message.createMessageComponentCollector({ max: 1, time: 1000 * 20, filter: (collector) => collector.customId === hex, componentType: ComponentType.StringSelect });

        collector.on("collect", async (collect) => {
            Tf = true
            if (collect.values[0] == captcha.captcha.text) {
                await interaction.member.roles.add(role)
                return await interaction.editReply({ embeds: [new EmbedBuilder().setTitle("인증을 성공했습니다",).setColor("Green")], files: [], components: [] })
            } else {
                return await interaction.editReply({ embeds: [new EmbedBuilder().setTitle("잘못된 문자입니다, 다시 시도해 주세요!").setColor("Red")], files: [], components: [] })
            }
        });

        collector.on('end', async () => {
            if (Tf == false) {
                return await interaction.editReply({ embeds: [new EmbedBuilder().setTitle("시간이 초과되었습니다, 다시 시도해 주세요!").setColor("Red")], files: [], components: [] })
            }
        })

    }
}