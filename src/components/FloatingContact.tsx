import { Phone, MessageCircle } from 'lucide-react';

const FloatingContact = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
      {/* Hotline Button */}
      <a
        href="tel:0975224557"
        className="group flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
      >
        <div className="flex items-center px-4 py-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div className="pr-2">
            <div className="text-xs text-gray-600">Hotline</div>
            <div className="font-semibold text-sm">0975 224 557</div>
          </div>
        </div>
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/0975224557"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
      >
        <div className="flex items-center px-4 py-3">
          <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.49 10.272v-.45h1.347v6.322h-.77a.576.576 0 01-.577-.578v-5.294zm-3.808 1.67a.568.568 0 00-.697.412l-.016.06a.568.568 0 00.412.69l.06.016a2.724 2.724 0 011.157.61c.324.283.552.663.552 1.103 0 .442-.228.821-.552 1.104-.404.353-.947.558-1.51.624a4.259 4.259 0 01-.627.046h-.816v-1.13h.816c.45 0 .873-.088 1.164-.344.054-.048.075-.096.075-.126s-.021-.078-.075-.126a1.634 1.634 0 00-.696-.289l-.06-.016a1.698 1.698 0 01-1.217-2.044l.016-.06a1.698 1.698 0 012.044-1.217l.06.016c.318.086.619.223.885.404l-.68.68a1.604 1.604 0 00-.545-.242l-.06-.016zm6.797.027a2.665 2.665 0 00-.925.164c.033.156.05.317.05.481 0 .98-.593 1.821-1.437 2.178a.577.577 0 00.53.349h.77v-1.552h.565c.316 0 .576.26.576.577v2.103h1.231v-2.091a.565.565 0 01.565-.576h.577v-.565a.565.565 0 00-.565-.576h-1.372a.565.565 0 01-.565-.492zm-5.288.461a.566.566 0 00-.565.576c0 .316.25.577.565.577h2.262v-1.153H10.19z"/>
            </svg>
          </div>
          <div className="pr-2">
            <div className="text-xs text-gray-600">Chat Zalo</div>
            <div className="font-semibold text-sm text-gray-700">(8h-22h30)</div>
          </div>
        </div>
      </a>

      {/* Facebook Button */}
      <a
        href="https://www.facebook.com/vubachauto"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
      >
        <div className="flex items-center px-4 py-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mr-3">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="pr-2">
            <div className="text-xs text-gray-600">Chat Facebook</div>
            <div className="font-semibold text-sm text-gray-700">(8h-22h30)</div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default FloatingContact;