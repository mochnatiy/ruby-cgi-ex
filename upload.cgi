#!/usr/bin/env ruby
 
require 'cgi'

CHUNK_SIZE = 102400

cgi = CGI.new
params = cgi.params
 
if params.has_key? 'file'
  size = cgi.content_length

  io = params['file'].first
  server_file = 'files/' + io.original_filename
  File.open(server_file.untaint, 'w') do |f|
    offset = 0
    while buffer = io.read(CHUNK_SIZE)
      offset += CHUNK_SIZE
      f << buffer
      cgi.out('text/plain') { ((offset.to_f / size.to_f) * 100).to_i.to_s } # Worked synchronously :(
    end
  end
end
