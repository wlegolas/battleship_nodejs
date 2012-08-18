/* 
 * Classe que irá criar a conexão com o socket do Server e monitorar os eventos
 * disparados pelo Client e emitidos pelo Server.
 * @author Weslley Alves
 * @contact wesshead@gmail.com
 * @date 13/08/2012
 * @version v0.1
 * @requires socket.io versão v9 ou superior
 */
SocketIO = function(url, port, socketConfigs){
    var me = this;
    
    /**
     * @cfg {Object} socket
     * Objeto de conexão com o socket.io
     */
     me.socket = null;
    
    /**
     * @cfg {Strint} urlServer
     * IP do para subir o serviço do socket.io
     */
    me.urlServer = url || 'http://localhost';
    
    /**
     * @cfg {Int} connPort
     * Número da porta para a conexão do servidor
     */
    me.connPort = port || 8088;
    
    /**
     * @cfg {Bool} reconnect
     * Tenta reconectar ao socket no Server se cair a conexão
     */
    me.reconnect = true;
    
    /**
     * @cfg {Int} reconnectionDelay
     * Delay para a tentativa de reconexão
     */
    me.reconnectionDelay = 500;
    
    /**
     * @cfg {Int} maxReconnectionAttempts
     * Número máximo de tentativas de reconexão
     */
    me.maxReconnectionAttempts = 1000;
    
    /**
     * @cfg {Bool} secure
     * Informa se a conexão utiliza criptografia
     */
    me.secure = false;
    
    /**
     * Método que irá fazer a conexão com o socket.io
     * @param {String} proxy URL para a conexão com o socket
     * @param {Object} configs Objeto com as configurações para a conexão com o socket
     */
    me.connect = function(proxy, configs) {
        // Conectando no socket.io
        me.socket = io.connect(proxy, configs);
    }
    
    /**
     * Método construtor da Classe, este irá implementar a conexão
     * com o socket.io.
     */
    me.constructor = function() {
        // Configuração default para o socket.io
        var urlProxy = me.urlServer +':'+ me.connPort,
            socketConfigDefaults = {
                 'reconnect': me.reconnect
                ,'reconnection delay': me.reconnectionDelay
                ,'max reconnection attempts': me.maxReconnectionAttempts
                ,'secure': me.secure
            };
        
        // Aplicando as configurações enviadas na instânica do Objeto
        $.extend(socketConfigDefaults, socketConfigs || {});
        
        // Conectando no socket.io
        me.connect(urlProxy, socketConfigDefaults);
    }() 
    
    /**
     * Método que irá retornar o socket da conexão
     * @return {Object} Objeto da conexão com o socket.io
     */
    me.getSocket = function() {
        return this.socket;
    }
    
    /**
     * Método que irá adicionar o evento no socket para ser monitorado
     * @param {Object/String} eventName Nome do evento a ser disparado
     * @param {Function} fn Função que será executada ao disparar o evento
     */
    me.addEventListener = function(eventName, fn) {
        var socket = this.getSocket();
        
        socket.on(eventName, fn);       
    }
    
    /**
     * Método que irá disparar o evento para o socket no Server
     * @param {String} eventName Nome do evento a ser disparado
     * @param {Mixed} params Demais parâmetros a serem recebidos pelo método no Server
     */
    me.fireEvent = function(eventName, params) {
        var socket = this.getSocket();

        socket.emit.apply(socket, arguments);
    }
}